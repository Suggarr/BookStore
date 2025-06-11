import { useEffect, useState } from "react";
import { BookRequest } from "../services/books";
import Modal from 'antd/es/modal/Modal'; 
import Input from 'antd/es/input/Input'; 
import TextArea from 'antd/es/input/TextArea'; 

interface Props {
    mode: Mode;
    values: Book;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: BookRequest) => void;
    handleUpdate: (id: string, request: BookRequest) => void; 
}

export enum Mode {
    Create,
    Edit,
} 

export const CreateUpdateBook = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,
}: Props) => {
    const [title, setTitle] = useState<string>(values.title || "");
    const [description, setDescription] = useState<string>(values.description || "");
    const [price, setPrice] = useState<number>(values.price || 1);

    useEffect(() => {
        if (mode === Mode.Edit) {
            setTitle(values.title);
            setDescription(values.description);
            setPrice(values.price);
        }
    }, [mode, values]);
    
    const handleOnOk = async () => {
        const bookRequest = {
            title,
            description,
            price,
        };

        mode === Mode.Create ? handleCreate(bookRequest) : handleUpdate(values.id, bookRequest);
    };

    return (
        <Modal 
            title={mode === Mode.Create ? "Добавить книгу" : "Редактировать книгу"} 
            open={isModalOpen}
            cancelText={"Отмена"}
            onOk={handleOnOk}
            onCancel={handleCancel}
        >
            <div className="book_modal">
                <Input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название"
                />
                <TextArea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    placeholder="Описание"
                />
                <Input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Цена"
                />
            </div>
        </Modal>
    );
};