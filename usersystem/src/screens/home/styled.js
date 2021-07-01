import styled from 'styled-components';

export const Form = styled.div`
    background-color: #FFF;
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const PhotoUpload = styled.form`
    background-color: #FFF;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
 
export const FormInput = styled.input`
    background: #DDD;
    border-radius: 30px;
    width: 100%;
    margin-bottom: 12px;
    padding: 8px 12px;
    border: none; 
    font-size: 14px;
`;

export const LineDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px;
`;

export const InputAreaPhoto = styled.div`
    height: 100px;
    width: 100px;
    border-radius: 120px;
    background-color: #DDD;
    justify-content: center;
    align-items: center;
    border: none;
    display: flex;
    position: relative;
    margin-bottom: 10px;
    margin-top: -15px;

`;

export const InputPhoto = styled.input`
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;
    position: absolute;
`;

export const Photo = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 120px;
`;