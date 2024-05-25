import Link from "next/link";


export default function BreadCrumb({ links }: { links: { title: string, href: string, active: boolean }[] }) {
    return (
        <div className="wrapper">
            <div className="breadcrumbs">
                <ul>
                    {
                        links.map((link, index) => (
                            <li key={index} className={link.active ? "active" : ""}>
                                <Link href={link.href}>
                                    <i className="fas fa-home icon"></i>
                                    <p>{link.title}</p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
