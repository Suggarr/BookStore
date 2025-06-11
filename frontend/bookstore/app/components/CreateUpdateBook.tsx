import { useState } from "react";
import { BookRequest } from "../services/books";
import { Book } from "../Models/Book";
import Modal from 'antd/es/modal/Modal'; 
import Input from 'antd/es/input/Input'; 
import TextArea from 'antd/es/input/TextArea'; 

interface Props{
    mode: Mode;
    values: Book[];
    isModalOpen: boolean;
    handleCancel: () =>void;
    handleCreate: (request: BookRequest) => void;
    handleUpdate: (id: string, request: BookRequest) => void; 
}

export enum Mode{
    Create,
    Edit,
} 

export const CreateUpdateBooks = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,
}: Props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(1);
    const handleOnOk = async () => {
        const bookRequest = {
            title,
            description,
            price,
        };

        if (mode === Mode.Create) {
            handleCreate(bookRequest);
        } else if (values.length > 0) {
            handleUpdate(values[0].id, bookRequest);
        }

    };
    return (
        <Modal title={mode === Mode.Create ? "Добавить книгу" : "Редактировать книгу"} open={isModalOpen}
            cancelText={"Отмена"}
            onOk={handleOnOk}
            onCancel={handleCancel}
        >
            <div className="book_modal">
                <Input>
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название"
                </Input>
                <TextArea>
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoSize={{minrows:3 ,maxRows: 3}}
                    placeholder="Название"
                </TextArea>
                <Input>
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Цена"
                </Input>
            </div>
        </Modal>
    )
}