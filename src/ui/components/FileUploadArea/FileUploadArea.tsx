import React, {FC, useRef, useState} from 'react';
import {SFileUploadArea, SFileUploadAreaImage} from "./styled";
import {SText} from "../Text/SText";

type TFileUploadAreaProps = {
    placeholder?: string
    onClick?: (file: string) => void
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    currentFile?: string
}
export const FileUploadArea: FC<TFileUploadAreaProps> = (props) => {

    const [currentImage, setCurrentImage] = useState(props.currentFile || "")
    const inputFile = useRef<HTMLInputElement | null>(null);

    const onClickHandler = () => {
        inputFile.current?.click();
    }

    const encodeImageFileAsURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file = event.target.files && event.target.files[0]
        let reader = new FileReader();
        reader.onloadend = function () {
            setCurrentImage(String(reader.result))
            props.onClick && props.onClick(String(reader.result))
            props.onChange && props.onChange(event)
        };
        reader.readAsDataURL(file as Blob);
    };

    return (
        <SFileUploadArea onClick={onClickHandler}>
            <SFileUploadAreaImage img={currentImage}></SFileUploadAreaImage>
            <input
                name={props.name}
                type="file"
                ref={inputFile}
                onChange={encodeImageFileAsURL}
                style={{display: "none"}}
            />
            {!currentImage && (
                <SText opacity={0.4}>
                    {props.placeholder || "Choose file"}
                </SText>
            )}
        </SFileUploadArea>
    );
};

