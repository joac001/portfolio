import ThemeToggle from "./ThemeToggle";

export default function AppBar() {
    return (
        <header className="px-4 py-4 flex justify-end items-center w-full" role="banner">
            <nav aria-label="Site controls">
                <ThemeToggle />
            </nav>
        </header>
    );
}
