import styled from 'styled-components';

type BackgroundImageProps = {
  imageUrl: string;
};

export const BackgroundImage = styled.div<BackgroundImageProps>`
    width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    background-image: ${({imageUrl}) => `url(${imageUrl})`};
`

export const Body = styled.div`    
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20%;
    border: 0px solid black;
    background-color: white;
    opacity: 0.7;
    position: absolute;

    h2 {
      font-weight: bold;
      margin: 10px 6px 0;
      font-size: 22px;
      color: #4a4a4a;
      text-transform: uppercase;
    }

    p {
      font-weight: lighter;
      font-size: 16px;
    }  
`

export const DirectoryItemContainer = styled.div`
  width: 50%;
  height: 440px;  
  display: flex;  
  align-items: center;
  justify-content: center;  
  margin:  7.5px 65px;
  overflow: hidden;
  

  &:hover {
    cursor: pointer;

    & ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${Body} {
      opacity: 0.9;
    }
  }

  &:nth-child(odd) {
  
  }

 &:nth-child(even) {
      margin-left: 600px;/* Move even-indexed items to the second column */
  }


`
