import "./MaeglerCard.css";
import emailIcon from "../../../public/images/emailMægler.png";
import inIcon from "../../../public/images/inMægler.png";
import Image from "next/image";

export default async function MaeglerCard({ items }) {
    return (
        <section className="w-[20rem] shadow-lg flex flex-col mt-6 bg-white text-center pb-2">
            <img
                className="h-[17rem] mb-4 object-cover"
                src={items.image.url}
            />
            <div className="px-6 flex flex-col">
                <h3 className="font-semibold text-xl mb-2">{items.name}</h3>
                <a
                    className="hover:text-orange-400"
                    href={`mailto:${items.email}`}
                >
                    {items.email}
                </a>
                <div className="flex gap-4 w-full justify-center mt-4 mb-4">
                    <a href="">
                        <Image alt="email icon" src={emailIcon} />
                    </a>
                    <a href="">
                        <Image alt="email icon" src={inIcon} />
                    </a>
                </div>
            </div>
        </section>
    );
}