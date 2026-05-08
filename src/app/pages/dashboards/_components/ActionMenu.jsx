import { Fragment } from "react"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { Button } from "components/ui"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

export default function ActionMenu({ items }) {
    return (
        <div className="relative inline-block text-start">
            <Menu as="div" className="relative">
                <MenuButton as={Button} className="size-8 shrink-0 p-0">
                    <EllipsisHorizontalIcon className="size-5" />
                </MenuButton>

                <Transition
                    as={Fragment}
                    enter="transition ease-out"
                    enterFrom="opacity-0 translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-2"
                >
                    <MenuItems className="absolute z-[100] mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-none focus-visible:outline-none dark:border-dark-500 dark:bg-dark-700 dark:shadow-none">
                        {items.map((item, index) => (
                            <MenuItem key={index}>
                                {({ focus }) => (
                                    <button
                                        onClick={item.onClick}
                                        className={clsx(
                                            "flex h-9 w-full items-center px-3 tracking-wide outline-none transition-colors",
                                            focus && "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100"
                                        )}
                                    >
                                        <span>{item.label}</span>
                                    </button>
                                )}
                            </MenuItem>
                        ))}

                        <hr className="mx-3 my-1.5 h-px border-gray-150 dark:border-dark-500" />

                        {items.some(item => item.isSeparated) && (
                            items
                                .filter(item => item.isSeparated)
                                .map((item, index) => (
                                    <MenuItem key={`separated-${index}`}>
                                        {({ focus }) => (
                                            <button
                                                onClick={item.onClick}
                                                className={clsx(
                                                    "flex h-9 w-full items-center px-3 tracking-wide outline-none transition-colors",
                                                    focus && "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100"
                                                )}
                                            >
                                                <span>{item.label}</span>
                                            </button>
                                        )}
                                    </MenuItem>
                                ))
                        )}
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}
