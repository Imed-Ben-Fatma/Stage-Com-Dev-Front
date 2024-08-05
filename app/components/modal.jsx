"use client";
import {useSearchParams, usePathname} from "next/navigation";
import Link from "next/link";

export default function Modal() {
    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    const message = searchParams.get("message");
    const pathname = usePathname();

    return (
        <>
            {modal &&
                <dialog
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-30 z-50 overflow-auto backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white m-auto p-8">
                        <div className="flex flex-col items-center">
                            <p>{message}</p>
                            <br/>
                            <Link href={pathname}>
                                <button type="button" className="bg-red-500 text-white p-2">Close Modal</button>
                            </Link>
                        </div>
                    </div>
                </dialog>
            }
        </>
    );
}
