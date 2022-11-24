import React, { ChangeEvent, FC, useRef, useState } from "react";
import { SFileUploadArea, SFileUploadAreaImage } from "./styled";
import { SText } from "../Text/SText";
import { useAppDispatch } from "../../../hooks/hooks";
import { setAppMessage } from "../../../bll/appReducer";

type TFileUploadAreaProps = {
    placeholder?: string;
    onClick?: (file: string) => void;
    name?: string;
    onChange: (file: string) => void;
    value: string;
    size?: number;
    fileType?: "image" | "document";
};
export const FileUploadArea: FC<TFileUploadAreaProps> = ({ size = 775000, ...props }) => {
    const inputAccept = {
        image: ".png, .jpg, .jpeg, .gif",
        document: ".doc, .pdf",
    };
    const dispatch = useAppDispatch();
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [drag, setDrag] = useState(false);

    const onClickHandler = () => {
        inputFile.current?.click();
    };

    const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string;
            callBack(file64);
        };
        reader.readAsDataURL(file);
    };
    const uploadFile = (files: any) => {
        if (files && files.length) {
            const file = files[0];
            if (file.size < size) {
                convertFileToBase64(file, (file64: string) => {
                    props.onChange(file64);
                });
            } else {
                dispatch(
                    setAppMessage({
                        severity: "error",
                        text: "The file size should be less than 775 KB",
                    })
                );
            }
        }
    };
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        uploadFile(files);
    };
    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    };

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    };

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
        const files = e.dataTransfer.files;
        uploadFile(files);
    };

    return (
        <SFileUploadArea
            onClick={onClickHandler}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
        >
            <SFileUploadAreaImage img={props.value}></SFileUploadAreaImage>
            <input
                accept={props.fileType && inputAccept[props.fileType]}
                name={props.name}
                type="file"
                ref={inputFile}
                onChange={uploadHandler}
                style={{ display: "none" }}
            />
            <SText opacity={0.4}>
                {!drag
                    ? props.placeholder || !props.value || props.value === "null"
                        ? "Choose file or drag it here"
                        : "Change file or drag it here"
                    : "release"}
            </SText>
        </SFileUploadArea>
    );
};
