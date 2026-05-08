import { ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "components/ui";
import { useDisclosure } from "hooks";
import {useState} from "react";

export const ConfirmModal = ({
                                 triggerButton = null,
                                 onConfirm,
                                 onCancel,
                                 messages = {},
                                 initialState = "pending",
                                 confirmText = "Confirmar",
                                 cancelText = "Cancelar",
                                 confirmButtonProps = {},
                                 cancelButtonProps = {}
                             }) => {
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, open, close } = useDisclosure();

    const defaultMessages = {
        pending: {
            Icon: ExclamationTriangleIcon,
            title: "Are you sure?",
            description: "This action cannot be undone.",
            actionText: confirmText,
        },
        success: {
            Icon: CheckCircleIcon,
            title: "Success!",
            description: "Action completed successfully.",
        },
        error: {
            Icon: XCircleIcon,
            title: "Error",
            description: "An error occurred. Please try again.",
        },
    };

    const mergedMessages = {
        pending: { ...defaultMessages.pending, ...messages.pending },
        success: { ...defaultMessages.success, ...messages.success },
        error: { ...defaultMessages.error, ...messages.error },
    };

    const currentMessage = mergedMessages[state];
    const IconComponent = currentMessage.Icon;

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
            setState("success");
            if (currentMessage.autoClose !== false) {
                setTimeout(close, 1500);
            }
        } catch (error) {
            setState("error");
            console.error("Confirmation error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        onCancel?.();
        close();
        setState(initialState);
    };

    return (
        <>
            {triggerButton ? (
                <div onClick={open}>{triggerButton}</div>
            ) : (
                <Button onClick={open}>Open Modal</Button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                        <div className="text-center">
                            {IconComponent && (
                                <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
                                    state === "success" ? "bg-green-100 text-green-600" :
                                        state === "error" ? "bg-red-100 text-red-600" :
                                            "bg-yellow-100 text-yellow-600"
                                }`}>
                                    <IconComponent className="h-6 w-6" />
                                </div>
                            )}

                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-3">
                                {currentMessage.title}
                            </h3>

                            {currentMessage.description && (
                                <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                    {currentMessage.description}
                                </div>
                            )}
                        </div>

                        <div className="mt-5 sm:mt-6 flex gap-3 justify-center">
                            {state === "pending" ? (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={isLoading}
                                        {...cancelButtonProps}
                                    >
                                        {cancelText}
                                    </Button>
                                    <Button
                                        onClick={handleConfirm}
                                        isLoading={isLoading}
                                        disabled={isLoading}
                                        {...confirmButtonProps}
                                    >
                                        {currentMessage.actionText || confirmText}
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={close}>
                                    Close
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};