// components/ui/Drawer/RightDrawer.jsx
import PropTypes from "prop-types";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

// Local Imports
import { Avatar, Button } from "components/ui";
import { useDisclosure } from "hooks";

const RightDrawer = ({
                         triggerButton = <Button>Open Drawer</Button>,
                         title = "Drawer Title",
                         subtitle,
                         avatarSrc,
                         width = "72",
                         items = [],
                         footer,
                         onClose,
                         isOpen: externalIsOpen,
                         onOpenChange,
                     }) => {
    const [internalIsOpen, { open, close }] = useDisclosure(false);
    const isControlled = externalIsOpen !== undefined;
    const openState = isControlled ? externalIsOpen : internalIsOpen;
    const setOpenState = isControlled ? onOpenChange : (state) => (state ? open() : close());

    const handleClose = () => {
        setOpenState(false);
        onClose?.();
    };

    return (
        <>
            {!isControlled && (
                <div onClick={() => setOpenState(true)}>
                    {triggerButton}
                </div>
            )}

            <Transition appear show={openState} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={handleClose}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur transition-opacity dark:bg-black/40" />
                    </TransitionChild>

                    <TransitionChild
                        as={Fragment}
                        enter="ease-out transform-gpu transition-transform duration-200"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="ease-in transform-gpu transition-transform duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <DialogPanel className={`fixed right-0 top-0 flex h-full w-${width} transform-gpu flex-col bg-white transition-transform duration-200 dark:bg-dark-700`}>
                            <div className="flex mt-10 ml-4 space-x-4 px-4">
                                    <Avatar
                                        size={20}
                                        src={avatarSrc}
                                        className="-mt-5"
                                        name={title.charAt(0)}
                                    />
                                <div className=" w-full min-w-0">
                                    <div className="flex justify-between">
                                        <h4 className="truncate text-base font-medium text-gray-800 dark:text-dark-50 ltr:mr-2 rtl:ml-2">
                                            {title}
                                        </h4>
                                        <Button
                                            onClick={handleClose}
                                            variant="flat"
                                            isIcon
                                            className="size-6 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
                                        >
                                            <XMarkIcon className="size-4.5" />
                                        </Button>
                                    </div>

                                    {subtitle && (
                                        <div className="cursor-pointer text-xs-plus font-medium text-primary-600 outline-none transition-colors duration-300 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400/70 dark:focus:text-primary-400/70">
                                            {subtitle}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <hr className="mx-5 my-4 h-px border-gray-200 dark:border-dark-500" />

                            <div className="grow overflow-y-auto px-5">
                                {typeof items === "function" ? items({ close: handleClose }) : items}
                            </div>

                            {footer && (
                                <div className="p-5">
                                    {typeof footer === "function" ? footer({ close: handleClose }) : footer}
                                </div>
                            )}
                        </DialogPanel>
                    </TransitionChild>
                </Dialog>
            </Transition>
        </>
    );
};

RightDrawer.propTypes = {
    triggerButton: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    avatarSrc: PropTypes.string,
    backgroundImage: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    items: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
};

export default RightDrawer;