import Beams from "./components/Beams";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import Yeat from "./assets/yeat.png";
import ASCIIText from "./components/ASCIIText.tsx";
import { motion } from "motion/react";
import useIsMobile from "./hooks/useIsMobile";
import ShinyText from "./components/ShinyText";
import { useEffect, type ReactNode } from "react";
import github from "./assets/github.svg";
import instagram from "./assets/instagram.svg";
import soundcloud from "./assets/soundcloud.svg";
// import tiktok from "./assets/tiktok.svg";
import discord from "./assets/discord.svg";
import { ChevronRight } from "lucide-react";

export default function Layout() {
	const isMobile = useIsMobile();

	const IntroTextSize: { FontSize: number; AsciiSize: number } = {
		FontSize: isMobile ? 20 : 100,
		AsciiSize: isMobile ? 7 : 8,
	};

	const CardSize: { Width: string; Height: string } = {
		Width: isMobile ? "320px" : "600px",
		Height: isMobile ? "620px" : "650px",
	};

	const Links: { title: string; icon: string; url: string }[] = [
		{ title: "Instagram", icon: instagram, url: "https://instagram.com/clxakz.movie" },
		{ title: "Github", icon: github, url: "https://github.com/clxakz" },
		{ title: "SoundCloud", icon: soundcloud, url: "https://soundcloud.com/clxakz" },
		// { title: "TikTok", icon: tiktok, url: "https://www.tiktok.com/@clxakz" },
		{ title: "Discord", icon: discord, url: "https://discord.com/users/609106426341621781" },
	];

	useEffect(() => {
		if (!sessionStorage.getItem("first-load-reloaded")) {
			sessionStorage.setItem("first-load-reloaded", "true");
			window.location.reload();
		}
	}, []);

	return (
		<div className="relative flex items-center justify-center w-screen h-screen perspective-midrange">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: [0, 1, 1, 0], y: [0, 0, 0, -500] }}
				transition={{
					delay: 0.5,
					duration: 3,
					times: [0, 0.5, 0.8, 1],
					ease: "easeInOut",
				}}
				className="absolute inset-0 z-100"
			>
				<ASCIIText
					enableWaves
					planeBaseHeight={5}
					textFontSize={IntroTextSize.FontSize}
					asciiFontSize={IntroTextSize.AsciiSize}
					text="clxakz"
				/>

				{/* <h1 className="custom-font text-9xl">Clxakz</h1> */}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, filter: "blur(10px)" }}
				animate={{ opacity: 1, filter: "blur(0px)" }}
				transition={{ delay: 3, duration: 1.5, ease: "easeIn" }}
				className="absolute inset-0"
			>
				<Beams rotation={35} />
			</motion.div>

			<motion.div
				style={{ transformStyle: "preserve-3d", width: CardSize.Width, height: CardSize.Height }}
				initial={{ opacity: 0, rotateX: 35, y: "100%", filter: "blur(10px)", scale: 1 }}
				animate={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)", scale: 1 }}
				transition={{ delay: 3, type: "spring", stiffness: 20, damping: 7, when: "beforeChildren", delayChildren: 100 }}
				className="absolute overflow-hidden z-100 flex flex-col *:border-red-500/0 *:border p-2 border shadow-lg backdrop-brightness-100 rounded-xl backdrop-blur-lg"
			>
				<motion.section
					initial={{ scale: 0.4, y: -200 }}
					animate={{ scale: 1, y: 0 }}
					transition={{ delay: 3.3, type: "spring", stiffness: 30, damping: 7 }}
					className="flex flex-col items-center justify-center pt-10 select-none"
				>
					<Avatar className="size-20">
						<AvatarImage src={Yeat} alt="pfp" />
						<AvatarFallback>CA</AvatarFallback>
					</Avatar>

					<h1 className="text-5xl leading-8">clxakz</h1>
					<ShinyText text="software engineer" />
				</motion.section>

				<motion.section className="grid grid-cols-1 gap-1 mt-auto sm:grid-cols-2 select-none">
					{Links.map((link, index) => (
						<LinkItem key={link.title} index={index} icon={link.icon} url={link.url}>
							{link.title}
						</LinkItem>
					))}
				</motion.section>
			</motion.div>
		</div>
	);
}

function LinkItem({ children, icon, url, index }: { children: ReactNode; icon: string; url: string; index: number }) {
	return (
		<motion.a
			initial={{ opacity: 0, scale: 0, y: 100 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ delay: 3.5 + index * 0.2, type: "spring", stiffness: 30, damping: 9 }}
			href={url}
			target="_blank"
			className="flex items-center flex-1 gap-2 px-5 py-4 border shadow-lg group bg-white/2 backdrop-brightness-100 rounded-xl backdrop-blur-lg"
		>
			<img src={icon} className="size-6.5 invert" />
			<p className="mb-0.5 text-xl leading-0">{children}</p>
			<ChevronRight className="ml-auto transition-transform group-hover:translate-x-1" />
		</motion.a>
	);
}
