// 'use client';

// import { Search, Flame, Globe, LogIn, UserPlus } from "lucide-react";
// import { CiYoutube } from "react-icons/ci";
// import { useState } from "react";
// import Link from "next/link";
// import { useUserContext } from "../context/userContext";
// import { logout } from "../actions/auth";
// import { useRouter } from "next/navigation";

// const Navbar = () => {
//     const [searchOpen, setSearchOpen] = useState(false);

//     const router = useRouter()
//     const UserContext = useUserContext()
//     const user = UserContext?.user
//     const setUser = UserContext?.setUser

//     console.log('Navbar user:', user)

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white text-black backdrop-blur-xl">
//             <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
//                 <Link href="/" className="flex items-center gap-2 shrink-0">
//                     <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white font-mono text-sm font-bold text-blue-500-foreground">
//                         {"</>"}
//                     </div>
//                     <span className="font-mono text-lg font-bold text-foreground hidden sm:block">
//                         Algo<span className="text-blue-500">Craft</span>
//                     </span>
//                 </Link>

//                 <div className="hidden md:flex items-center gap-1">
//                     <Link
//                         href="/learn"
//                         className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors rounded-md"
//                     >
//                         Learn
//                     </Link>
//                     <Link
//                         href="/practice"
//                         className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors rounded-md"
//                     >
//                         Practice
//                     </Link>
//                     <Link
//                         href="/resources"
//                         className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors rounded-md"
//                     >
//                         Resources
//                     </Link>
//                     <Link
//                         href="/profile"
//                         className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors rounded-md"
//                     >
//                         Profile
//                     </Link>
//                 </div>

//                 <div className="flex items-center gap-2">
//                     <div className={`relative transition-all duration-300 ${searchOpen ? "w-48 lg:w-64" : "w-9"}`}>
//                         <button
//                             onClick={() => setSearchOpen(!searchOpen)}
//                             className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
//                         >
//                             <Search size={16} />
//                         </button>
//                         <input
//                             type="text"
//                             placeholder="Search topics..."
//                             className={`h-9 w-full rounded-lg border border-border bg-secondary pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-blue-500text-blue-500 transition-all ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//                         />
//                     </div>

//                     <a href="https://www.youtube.com/@PCSGlobalPrivateLimited" className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:text-red-500" title="YouTube">
//                         <CiYoutube size={18} />
//                     </a>
//                     <a href="https://www.pcsglobal.in/#/home" className="p-2 text-muted-foreground transition-colors hover:text-blue-500" title="Website">
//                         <Globe size={18} />
//                     </a>

//                     <button className="px-2 py-1 text-streak hover:scale-110 transition-transform flex gap-2 justify-center items-center border-2 border-amber-500 text-amber-500 rounded-2xl" title="Streak">
//                         <Flame size={18} />
//                         0
//                     </button>

//                     {user?.username !== "" ? (
//                         <div className="flex items-center gap-3">

//                             {/* Avatar */}
//                             <div className="w-9 h-9 flex items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-blue-600 text-white font-semibold text-sm shadow-sm">
//                                 {user?.username?.charAt(0)?.toUpperCase() || "U"}
//                             </div>

//                             {/* Username + Logout */}
//                             <div className="flex items-center gap-2">
//                                 <span className="text-sm font-medium text-gray-700">
//                                     {user?.username}
//                                 </span>
//                                 <button
//                                     onClick={() => { logout(); setUser && setUser({ username: "", id: "", role: "user", email: "", dateJoined: new Date(Date.now()) }) }}
//                                     className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300">
//                                     Logout
//                                 </button>

//                             </div>

//                         </div>
//                     ) : (
//                         <div className="flex">
//                             <button onClick={() => { router.push('/login') }} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
//                                 <LogIn size={15} />
//                                 Sign In
//                             </button>
//                             <button onClick={() => { router.push('/signup') }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-500 text-white font-mono text-xs font-medium hover:bg-blue-500text-blue-500/90 transition-colors">
//                                 <UserPlus size={15} />
//                                 <span className="hidden sm:inline">Register</span>
//                             </button>
//                         </div>
//                     )}

//                 </div>
//             </div>
//         </nav>
//     );
// };

// const NavItem = ({ label }: { label: string }) => (
//     <a
//         href="#"
//         className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors rounded-md hover:bg-secondary"
//     >
//         {label}
//     </a>
// );

// export default Navbar;


'use client';

import { Search, Flame, Globe, LogIn, UserPlus, Menu, X } from "lucide-react";
import { CiYoutube } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useUserContext } from "../context/userContext";
import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";
import { getAllSubtopics } from "../db/operations/subtopics";

const Navbar = () => {
    const navRef = useRef<HTMLElement | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [subTopicList, setSubTopicList] = useState<string[]>([]);

    const router = useRouter();
    const UserContext = useUserContext();
    const user = UserContext?.user;
    const setUser = UserContext?.setUser;

    const navLinks = (
        <>
            <Link href="/learn" className="nav-link active:bg-slate-100 rounded">Learn</Link>
            <Link href="/practice" className="nav-link active:bg-slate-100 rounded">Practice</Link>
            <Link href="/resources" className="nav-link active:bg-slate-100 rounded">Resources</Link>
            <Link href="/profile" className="nav-link active:bg-slate-100 rounded">Profile</Link>
        </>
    );

    useEffect(() => {
        const fetchAllSubtopics = async () => {
            const allSutopics = await getAllSubtopics();
            setSubTopicList(allSutopics)
        }
        fetchAllSubtopics();
    }, [])

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (searchOpen && navRef.current && !navRef.current.contains(target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, [searchOpen]);

    const filteredSubtopics = subTopicList.filter((subtopic) =>
        subtopic.toLowerCase().includes(searchValue.toLowerCase())
    );

    console.log(filteredSubtopics)
    console.log(subTopicList)

    return (
        <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white text-black backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white font-mono text-sm font-bold">
                        {"</>"}
                    </div>
                    <span className="font-mono text-lg font-bold hidden sm:block">
                        Algo<span className="text-blue-500">Craft</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">

                    {/* Search */}
                    <div className={`relative transition-all duration-300 ${searchOpen ? "w-40 lg:w-64" : "w-9"}`}>
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                        >
                            <Search size={16} />
                        </button>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className={`h-9 w-full rounded-lg border pl-8 pr-3 text-sm transition-all ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                        />
                        <div className={`absolute top-full ${searchOpen ? "block" : "hidden"} min-w-[20vw] left-0 mt-2 w-full bg-white shadow-lg rounded-md`}>
                            <div className="p-2 text-sm text-muted-foreground">
                                {filteredSubtopics.length > 0
                                    ? filteredSubtopics.map((sub, idx) => (
                                        <div key={idx} onClick={() => {router.push(`/learn#${sub.toLowerCase().replace(" ", "_")}`)}} className="px-2 py-1 hover:bg-slate-100 cursor-pointer">
                                            {sub}
                                        </div>
                                    ))
                                    : "No results found"}
                            </div>
                        </div>
                    </div>

                    {/* Icons (hidden on very small screens optionally) */}
                    <div className="hidden sm:flex items-center gap-2">
                        <a href="https://www.youtube.com/@PCSGlobalPrivateLimited"><CiYoutube size={18} /></a>
                        <a href="https://www.pcsglobal.in/"><Globe size={18} /></a>

                        <button className="flex items-center gap-1 border border-amber-500 text-amber-500 px-2 py-1 rounded-xl">
                            <Flame size={16} /> 0
                        </button>
                    </div>

                    {/* Auth */}
                    <div className="hidden md:flex items-center">
                        {user?.username ? (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                    {user.username[0]?.toUpperCase()}
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setUser?.({ username: "", id: "", role: "user", email: "", dateJoined: new Date() });
                                    }}
                                    className="text-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button onClick={() => router.push('/login')} className="px-2 flex items-center gap-1 rounded">
                                    <LogIn size={16} /> Login
                                </button>
                                <button onClick={() => router.push('/signup')} className="bg-blue-500 text-white px-2 py-1 flex items-center gap-1 rounded">
                                    <UserPlus size={16} /> Register
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-white px-4 py-4 space-y-3 text-center">

                    {/* Links */}
                    <div className="flex flex-col gap-2">
                        {navLinks}
                    </div>

                    {/* Icons */}
                    <div className="flex w-full justify-around items-center pt-2">
                        <a className="bg-slate-100 w-[45%] h-full py-2 flex justify-center items-center" href="https://www.youtube.com/@PCSGlobalPrivateLimited"><CiYoutube size={18} /></a>
                        <a className="bg-slate-100 w-[45%] h-full py-2 flex justify-center items-center" href="https://www.pcsglobal.in/"><Globe size={18} /></a>
                    </div>

                    {/* Auth */}
                    <div className="pt-2">
                        {user?.username ? (
                            <button
                                onClick={() => {
                                    logout();
                                    setUser?.({ username: "", id: "", role: "user", email: "", dateJoined: new Date() });
                                }}
                                className="w-full text-center text-red-500"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button onClick={() => router.push('/login')} className="flex-1 border p-2 rounded">
                                    Sign In
                                </button>
                                <button onClick={() => router.push('/signup')} className="flex-1 bg-blue-500 text-white p-2 rounded">
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;