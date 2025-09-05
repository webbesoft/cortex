import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CheckCheckIcon, IdCardIcon, LayoutGrid, NotebookPen } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Review',
        href: '/reviews',
        icon: CheckCheckIcon,
    },
    {
        title: 'Flashcards',
        href: '/flashcards',
        icon: IdCardIcon,
    },
    {
        title: 'Notes',
        href: '/notes',
        icon: NotebookPen,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    const { props } = usePage<{
        quote: {
            author: string;
            message: string;
        };
    }>();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {props.quote && (
                    <div className="mb-4 border-t border-sidebar-border pt-4">
                        <blockquote className="space-y-2">
                            <p className="text-sm leading-relaxed text-sidebar-foreground/70 italic">"{props.quote.message}"</p>
                            <cite className="text-xs font-medium text-sidebar-foreground/50 not-italic">— {props.quote.author}</cite>
                        </blockquote>
                    </div>
                )}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
