import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  NextOrObserver,
  User,
  updateProfile,
  onAuthStateChanged,
  UserCredential
  } from 'firebase/auth';
import {getFirestore, 
        doc, 
        getDoc, 
        setDoc, 
        collection, 
        writeBatch,
        orderBy,
        query,
        getDocs,
        QueryDocumentSnapshot
      } from 'firebase/firestore'
// Your web app's Firebase configuration

import { Category } from '../../store/categories/category.types';

const firebaseConfig = {
  apiKey: "AIzaSyB7k5uBdE5AIZRSsWsMdnFOz3wiMbfU2y0",
  authDomain: "e-commerce-55979.firebaseapp.com",
  projectId: "e-commerce-55979",
  storageBucket: "e-commerce-55979.appspot.com",
  messagingSenderId: "104255154918",
  appId: "1:104255154918:web:bc78741a4743414e7fa927"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore(); 

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Done')
}

export const getCategoriesDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  //await Promise.reject(new Error('new error'))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
  
}

export type Directory = {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
}

export const getDirectoryDocuments = async (): Promise<Directory[]> => {
  const collectionRef = collection(db, 'directory');
  const q = query(collectionRef, orderBy('id'));

  //await Promise.reject(new Error('new error'))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Directory
  );
  
}

export type AdditionalInformation = {
  displayName?: string;
  role: string;
}

export type UserData = {
  uid: string;
  createdAt: Date;
  displayName: string;
  email: string;
  role: string;
}

export const createUserDocumentFromAuth = async (
  userAuth: User, 
  additionalInformation = {} as AdditionalInformation
  ): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if(!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);  
  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists()){
    const {displayName, email } = userAuth;   
    const createdAt = new Date();
    
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (
  email: string, 
  password: string, 
  additionalInformation = {} as AdditionalInformation
  ): Promise<UserCredential | null> => {
    if (!email || !password) return null;
   
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (userCredential && additionalInformation.displayName) {
      const { user } = userCredential;      
      await updateProfile(user, {
        displayName: additionalInformation.displayName
      });
    }

    return userCredential;   
  };

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => 
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
    )
  })
}

export const fetchUser = async (userId: string) => {
  try {
        //Reference to the specific user document
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        
        const user = userDoc.data(); // Access the document data
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
}