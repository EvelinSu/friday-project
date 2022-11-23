import React, {ChangeEvent, FC, useRef} from 'react';
import {SFileUploadArea, SFileUploadAreaImage} from "./styled";
import {SText} from "../Text/SText";
import {useAppDispatch} from "../../../hooks/hooks";
import {setAppMessage} from "../../../bll/appReducer";

type TFileUploadAreaProps = {
    placeholder?: string
    onClick?: (file: string) => void
    name?: string
    onChange: (file: string) => void
    value: string
    size?: number
}
export const FileUploadArea: FC<TFileUploadAreaProps> = ({size = 4000000, ...props}) => {
    const dispatch = useAppDispatch()
    const inputFile = useRef<HTMLInputElement | null>(null);

    const onClickHandler = () => {
        inputFile.current?.click();
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            if (file.size < size) {
                convertFileToBase64(file, (file64: string) => {
                    props.onChange(file64);
                });
            } else {
                dispatch(setAppMessage({severity: "error", text: "The file size should be less than 4 megabytes"}))
            }
        }
    };

    const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string;
            callBack(file64);
        };
        reader.readAsDataURL(file);
    };

    return (
        <SFileUploadArea onClick={onClickHandler}>
            <SFileUploadAreaImage img={props.value}></SFileUploadAreaImage>
            <input
                name={props.name}
                type="file"
                ref={inputFile}
                onChange={uploadHandler}
                style={{display: "none"}}
            />
            {(!props.value || (props.value === "null")) && (
                <SText opacity={0.4}>
                    {props.placeholder || "Choose file"}
                </SText>
            )}
        </SFileUploadArea>
    );
};

