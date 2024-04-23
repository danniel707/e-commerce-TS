import { FC } from 'react';
import { useNavigate } from 'react-router-dom'
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles'
import { Directory as DirectoryType } from '../../utils/firebase/firebase.utils';

type DirectoryItemProps = {
  category: DirectoryType;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(route);

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>		
	      <BackgroundImage 
	        imageUrl={imageUrl}
	        />
	     	<Body>
		        <h2>{title}</h2>
		        <p>Shop Now</p>
      		</Body>
        </DirectoryItemContainer>
	)
}

export default DirectoryItem