import { signIn } from "@/actions/auth";

export default async function Header() {
    
    return (
        <header className="container border-b h-16 flex items-center">
            <p>Supabase Demo</p>

            <form action={signIn}>
                <button>login</button>
            </form>
        </header>
    )
}