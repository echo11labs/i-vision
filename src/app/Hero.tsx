"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroFrameState = {
  id: "rectangular" | "round" | "cat-eye" | "aviator";
  label: string;
  shape: string;
  desktopSrc: string;
  mobileSrc: string;
};

const FRAME_STATES: HeroFrameState[] = [
  {
    id: "rectangular",
    label: "The Architect",
    shape: "Rectangular",
    desktopSrc: "/images/hero-sequence/rectangular-desktop.webp",
    mobileSrc: "/images/hero-sequence/rectangular-mobile.webp",
  },
  {
    id: "round",
    label: "The Academic",
    shape: "Round",
    desktopSrc: "/images/hero-sequence/round-desktop.webp",
    mobileSrc: "/images/hero-sequence/round-mobile.webp",
  },
  {
    id: "cat-eye",
    label: "The Editor",
    shape: "Cat eye",
    desktopSrc: "/images/hero-sequence/cat-eye-desktop.webp",
    mobileSrc: "/images/hero-sequence/cat-eye-mobile.webp",
  },
  {
    id: "aviator",
    label: "The Pilot",
    shape: "Aviator",
    desktopSrc: "/images/hero-sequence/aviator-desktop.webp",
    mobileSrc: "/images/hero-sequence/aviator-mobile.webp",
  },
];

const HERO_STOPS = [0, 0.315, 0.545, 0.775, 1];

function selectHeroControl(root: HTMLElement, index: number) {
  root.querySelectorAll<HTMLButtonElement>("[data-hero-stop]").forEach((button) => {
    if (Number(button.dataset.heroStop) === index) {
      button.setAttribute("aria-current", "step");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function frameIndexAt(progress: number) {
  const t = progress * 100;
  if (t >= 87) return 0;
  if (t >= 64) return 3;
  if (t >= 41) return 2;
  if (t >= 20) return 1;
  return 0;
}

const FRAME_TRANSITION_MASK = {
  WebkitMaskImage:
    "radial-gradient(ellipse var(--frame-focus-width) var(--frame-focus-height) at var(--frame-focus-x) var(--frame-focus-y), #000 0%, #000 64%, transparent 100%)",
  maskImage:
    "radial-gradient(ellipse var(--frame-focus-width) var(--frame-focus-height) at var(--frame-focus-x) var(--frame-focus-y), #000 0%, #000 64%, transparent 100%)",
};

const FRAME_LAYER_CLASS =
  "absolute inset-0 opacity-0 [--frame-focus-height:20%] [--frame-focus-width:70%] [--frame-focus-x:45%] [--frame-focus-y:34%] will-change-[filter,opacity] md:[--frame-focus-height:24%] md:[--frame-focus-width:30%] md:[--frame-focus-x:70%] md:[--frame-focus-y:42%]";

function ResponsiveHeroImage({
  frame,
  alt = "",
  highPriority = false,
  className = "",
}: {
  frame: HeroFrameState;
  alt?: string;
  highPriority?: boolean;
  className?: string;
}) {
  const common = {
    alt,
    sizes: "100vw",
    quality: 75,
    fetchPriority: highPriority ? ("high" as const) : ("auto" as const),
    loading: highPriority ? ("eager" as const) : ("lazy" as const),
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: frame.desktopSrc,
    width: 1672,
    height: 941,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    ...common,
    src: frame.mobileSrc,
    width: 752,
    height: 940,
  });

  return (
    <picture className="absolute inset-0 block h-full w-full">
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      <img
        {...mobileProps}
        alt={alt}
        className={`h-full w-full object-cover object-[35%_center] md:object-center ${className}`}
      />
    </picture>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const navigationTargetRef = useRef<number | null>(null);

  const scrollToFrame = (index: number) => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const start = root.getBoundingClientRect().top + window.scrollY;
    const distance = root.offsetHeight - stage.offsetHeight;
    const target = start + distance * HERO_STOPS[index];
    selectHeroControl(root, index);
    if (window.__lenis) {
      navigationTargetRef.current = index;
      window.__lenis.scrollTo(target, {
        duration: 1.05,
        easing: (t) => 0.5 - Math.cos(Math.PI * t) / 2,
        force: true,
        onComplete: () => { navigationTargetRef.current = null; },
      });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!root || !stage || reduceMotion) return;

    const selector = gsap.utils.selector(root);
    let cancelled = false;
    // A new gesture takes over immediately from a clicked step.
    const releaseNavigation = () => { navigationTargetRef.current = null; };
    window.addEventListener("wheel", releaseNavigation, { passive: true });
    window.addEventListener("touchstart", releaseNavigation, { passive: true });

    const context = gsap.context(() => {
      const roundLayer = selector<HTMLElement>("[data-frame-layer='round']");
      const catEyeLayer = selector<HTMLElement>("[data-frame-layer='cat-eye']");
      const aviatorLayer = selector<HTMLElement>("[data-frame-layer='aviator']");
      const frameLayers = selector<HTMLElement>("[data-frame-layer]");
      const lettersOf = (id: string) =>
        selector<HTMLElement>(`[data-frame-name='${id}'] [data-frame-letter]`);
      const architectLetters = lettersOf("rectangular");
      const academicLetters = lettersOf("round");
      const editorLetters = lettersOf("cat-eye");
      const pilotLetters = lettersOf("aviator");
      const progress = selector<HTMLElement>("[data-scroll-progress]");
      const actions = selector<HTMLElement>("[data-hero-actions]");
      const finalContent = selector<HTMLElement>("[data-hero-reveal]");
      const finalBadge = selector<HTMLElement>("[data-final-badge]");
      const finalKicker = selector<HTMLElement>("[data-hero-kicker]");
      const finalHeading = selector<HTMLElement>("#home-hero-title");
      const finalDescription = selector<HTMLElement>("[data-hero-description]");
      const finalButtons = selector<HTMLElement>("[data-hero-actions] a");
      const earlyStage = selector<HTMLElement>("[data-frame-studies]");
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const studyFor = (id: string) => selector<HTMLElement>(`[data-frame-study='${id}']`);
      const studyLeave = { autoAlpha: 0, y: -12, duration: 4, ease: "power2.in" };
      const studyArrive = { autoAlpha: 1, y: 0, duration: 6, ease: "power2.out", immediateRender: false };
      const leave = {
        autoAlpha: 0,
        y: -6,
        duration: 3.2,
        stagger: 0.38,
        ease: "power2.in",
      };
      const arrive = {
        autoAlpha: 1,
        y: 0,
        duration: 3.2,
        stagger: 0.38,
        ease: "power2.out",
        immediateRender: false,
      };
      const hidden = { autoAlpha: 0, y: 6, immediateRender: false };

      gsap.set(frameLayers, {
        autoAlpha: 0,
        filter: "blur(5px)",
      });
      gsap.set(selector("[data-frame-name]"), { opacity: 1 });
      gsap.set([academicLetters, editorLetters, pilotLetters], {
        autoAlpha: 0,
        y: 6,
      });
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(finalContent, { autoAlpha: 0, y: mobile ? 30 : 48 });
      gsap.set(finalHeading, { y: mobile ? 42 : 72, clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(finalButtons, { y: mobile ? 10 : 18 });
      gsap.set(finalBadge, { autoAlpha: 0, y: 6 });
      gsap.set(selector("[data-frame-study]:not([data-frame-study='rectangular'])"), { autoAlpha: 0, y: 10 });
      let accessibleState = "0:false";
      let selectedControl = 0;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          snap: {
            snapTo: HERO_STOPS,
            delay: 0.25,
            duration: { min: 0.25, max: 0.6 },
            ease: "power2.inOut",
            inertia: false,
            directional: false,
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = frameIndexAt(self.progress);
            const currentStop = navigationTargetRef.current ?? (self.progress >= 0.87 ? 4 : index);
            if (currentStop !== selectedControl) {
              selectedControl = currentStop;
              selectHeroControl(root, currentStop);
            }
            const state = `${index}:${self.progress >= 0.87}`;
            if (state === accessibleState) return;
            accessibleState = state;
            FRAME_STATES.forEach((frame, nameIndex) => {
              root.querySelectorAll(`[data-frame-study='${frame.id}']`).forEach((element) => {
                element.setAttribute("aria-hidden", self.progress < 0.87 && nameIndex === index ? "false" : "true");
              });
              root
                .querySelector(`[data-frame-name='${frame.id}']`)
                ?.setAttribute("aria-hidden", nameIndex === index ? "false" : "true");
            });
          },
        },
      });

      timeline
        .addLabel("final-architect", 87)
        .to(progress, { scaleX: 1, duration: 100 }, 0)
        // Never crossfade labels: the outgoing card is fully hidden first.
        .to(studyFor("rectangular"), studyLeave, 16)
        .fromTo(studyFor("round"), { autoAlpha: 0, y: 12 }, studyArrive, 20)
        .to(studyFor("round"), studyLeave, 37)
        .fromTo(studyFor("cat-eye"), { autoAlpha: 0, y: 12 }, studyArrive, 41)
        .to(studyFor("cat-eye"), studyLeave, 60)
        .fromTo(studyFor("aviator"), { autoAlpha: 0, y: 12 }, studyArrive, 64)
        .to(earlyStage, { autoAlpha: 0, duration: 6, ease: "sine.inOut" }, 81)
        .to(finalBadge, { autoAlpha: 1, y: 0, duration: 3.5, ease: "sine.inOut" }, "final-architect")
        .to(architectLetters, leave, 13)
        .fromTo(academicLetters, hidden, arrive, 18)
        .to(academicLetters, leave, 35)
        .fromTo(editorLetters, hidden, arrive, 41)
        .to(editorLetters, leave, 58)
        .fromTo(pilotLetters, hidden, arrive, 64)
        .to(pilotLetters, leave, 81)
        .fromTo(architectLetters, hidden, arrive, "final-architect")
        .to(
          roundLayer,
          { autoAlpha: 1, filter: "blur(0px)", duration: 14, ease: "sine.inOut" },
          14
        )
        .to(
          roundLayer,
          { autoAlpha: 0, filter: "blur(4px)", duration: 14, ease: "sine.inOut" },
          37
        )
        .to(
          catEyeLayer,
          { autoAlpha: 1, filter: "blur(0px)", duration: 14, ease: "sine.inOut" },
          37
        )
        .to(
          catEyeLayer,
          { autoAlpha: 0, filter: "blur(4px)", duration: 14, ease: "sine.inOut" },
          60
        )
        .to(
          aviatorLayer,
          { autoAlpha: 1, filter: "blur(0px)", duration: 14, ease: "sine.inOut" },
          60
        )
        .to(
          aviatorLayer,
          { autoAlpha: 0, filter: "blur(4px)", duration: 15, ease: "sine.inOut" },
          83
        )
        // A measured entrance: badge, headline, supporting copy, then actions.
        .to(finalKicker, { autoAlpha: 1, y: 0, duration: 4.5, ease: "sine.inOut" }, 87.5)
        .to(finalHeading, {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 8,
          ease: "power3.inOut",
        }, 87.5)
        .to(finalDescription, { autoAlpha: 1, y: 0, duration: 7, ease: "power2.inOut" }, 89.5)
        .to(actions, { autoAlpha: 1, y: 0, duration: 7, ease: "power2.inOut" }, 91)
        .to(finalButtons, { y: 0, duration: 4, stagger: 0.8, ease: "sine.inOut" }, 92);
    }, root);

    const images = Array.from(root.querySelectorAll("img"));
    Promise.all(
      images.map((image) =>
        image.complete ? Promise.resolve() : image.decode().catch(() => undefined)
      )
    ).then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      navigationTargetRef.current = null;
      window.removeEventListener("wheel", releaseNavigation);
      window.removeEventListener("touchstart", releaseNavigation);
      context.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      data-custom-motion
      className="relative h-[260svh] w-full bg-foreground motion-reduce:h-auto"
      aria-labelledby="home-hero-title"
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] min-h-0 overflow-hidden bg-foreground motion-reduce:relative motion-reduce:top-0"
      >
        <div className="absolute inset-0 z-0">
          <ResponsiveHeroImage
            frame={FRAME_STATES[0]}
            alt="Woman wearing contemporary rectangular eyeglasses in warm architectural light"
            highPriority
          />
        </div>

        <div
          data-frame-layer="round"
          aria-hidden="true"
          className={`${FRAME_LAYER_CLASS} z-10`}
          style={FRAME_TRANSITION_MASK}
        >
          <ResponsiveHeroImage frame={FRAME_STATES[1]} />
        </div>
        <div
          data-frame-layer="cat-eye"
          aria-hidden="true"
          className={`${FRAME_LAYER_CLASS} z-20`}
          style={FRAME_TRANSITION_MASK}
        >
          <ResponsiveHeroImage frame={FRAME_STATES[2]} />
        </div>
        <div
          data-frame-layer="aviator"
          aria-hidden="true"
          className={`${FRAME_LAYER_CLASS} z-30`}
          style={FRAME_TRANSITION_MASK}
        >
          <ResponsiveHeroImage frame={FRAME_STATES[3]} />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 z-[32] bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent md:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 z-[32] hidden w-[62%] bg-gradient-to-r from-background via-background/85 to-transparent md:block"
        />

        <div className="absolute inset-0 z-40 mx-auto flex max-w-[1440px] items-end px-4 pb-8 pt-8 sm:px-6 sm:pb-10 md:items-center md:px-8 md:pb-8 lg:px-12">
          <div className="flex w-full max-w-3xl flex-col text-background md:text-foreground">
            <div data-final-badge className="invisible relative flex h-9 items-center overflow-hidden opacity-0 motion-reduce:visible motion-reduce:opacity-100 md:h-12">
              <span className="inline-flex items-center overflow-hidden border border-foreground bg-background p-1 shadow-sm">
                <span className="bg-foreground px-2 py-1 font-brand text-[0.6875rem] uppercase leading-none tracking-caps text-background md:px-2.5 md:py-1.5 md:text-[0.8125rem]">
                  The
                </span>
                <span className="inline-grid px-2 py-1 text-foreground md:px-2.5 md:py-1.5">
                  {FRAME_STATES.map((frame, index) => (
                    <span
                      key={frame.id}
                      data-frame-name={frame.id}
                      aria-hidden={index === 0 ? undefined : true}
                      className={`col-start-1 row-start-1 font-brand text-[0.6875rem] uppercase leading-none tracking-caps md:text-[0.8125rem] ${index === 0 ? "" : "opacity-0"}`}
                    >
                      {frame.label
                        .split(" ")[1]
                        .split("")
                        .map((letter, letterIndex) => (
                          <span
                            key={`${frame.id}-${letterIndex}`}
                            data-frame-letter
                            className="inline-block"
                          >
                            {letter}
                          </span>
                        ))}
                    </span>
                  ))}
                </span>
              </span>
            </div>
            <p data-hero-reveal data-hero-kicker className="invisible opacity-0 motion-reduce:visible motion-reduce:opacity-100 mt-3 font-sans text-xs font-medium uppercase leading-none tracking-[0.14em] text-background/70 md:mt-4 md:text-[0.8125rem] md:text-foreground/60">
              Clarity changes the scene
            </p>
            <h1
              id="home-hero-title"
              data-hero-reveal
              className="invisible opacity-0 motion-reduce:visible motion-reduce:opacity-100 mt-3 font-display text-[clamp(2.25rem,10vw,2.75rem)] font-normal not-italic leading-[1.08] tracking-[-0.03em] text-balance md:mt-4 md:text-[clamp(3.25rem,6.5vw,4.75rem)] md:leading-[1.05]"
            >
              See things differently.
            </h1>
            <p data-hero-reveal data-hero-description className="invisible opacity-0 motion-reduce:visible motion-reduce:opacity-100 mt-4 whitespace-nowrap font-sans text-[0.78125rem] font-normal leading-none tracking-[-0.01em] text-background/80 md:mt-5 md:max-w-[38rem] md:whitespace-normal md:text-lg md:leading-[1.5] md:tracking-normal md:text-foreground/75">
              Eyewear shaped for the way you move through the world.
            </p>

            <div
              data-hero-actions
              data-hero-reveal
              className="invisible opacity-0 motion-reduce:visible motion-reduce:opacity-100 mt-6 flex flex-col gap-2.5 sm:max-w-xl sm:flex-row md:mt-8 md:gap-3"
            >
              <Link
                href="/eyeglasses"
                className="group flex min-h-11 items-center justify-between bg-background px-6 py-3 font-sans text-sm font-medium tracking-normal text-foreground md:min-h-12 md:py-3.5 transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:flex-1 md:bg-foreground md:text-background md:hover:bg-accent md:focus-visible:ring-foreground md:focus-visible:ring-offset-background"
              >
                <span>Shop eyewear</span>
                <ArrowRight
                  className="ml-4 h-4 w-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/sunglasses"
                className="flex min-h-11 items-center justify-center border border-background/70 px-6 py-3 font-sans text-sm font-medium tracking-normal text-background md:min-h-12 md:py-3.5 transition-colors hover:border-background hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:flex-1 md:border-foreground/45 md:text-foreground md:hover:border-foreground md:hover:bg-foreground/5 md:focus-visible:ring-foreground md:focus-visible:ring-offset-background"
              >
                Explore sunglasses
              </Link>
            </div>
          </div>
        </div>

        <div
          data-frame-studies
          className="pointer-events-none absolute inset-0 z-40 flex items-end px-6 pb-[9svh] text-background md:mx-auto md:max-w-[1440px] md:items-center md:px-8 md:pb-0 md:text-foreground lg:px-12 motion-reduce:hidden"
        >
          <div className="hidden text-left md:block md:w-[45%] md:max-w-[620px]">
            <p className="mb-4 text-sm font-normal uppercase tracking-[0.18em] [font-family:Boxing,sans-serif] md:mb-5">The</p>
            <div className="grid overflow-hidden py-1">
              {FRAME_STATES.map((frame, index) => (
                <div
                  key={frame.id}
                  data-frame-study={frame.id}
                  aria-hidden={index === 0 ? undefined : true}
                  className={`col-start-1 row-start-1 will-change-[transform,opacity] ${index === 0 ? "" : "invisible opacity-0"}`}
                >
                  <p className="whitespace-nowrap text-[clamp(2rem,4.2vw,4.5rem)] font-normal uppercase leading-[1.2] tracking-[0.015em] [font-family:Boxing,sans-serif]">
                    {frame.label.replace("The ", "")}
                  </p>
                  <div className="mt-5 flex items-center justify-start gap-4 text-xs uppercase tracking-[0.16em] md:mt-6 md:text-sm">
                    <span className="tabular-nums opacity-70">0{index + 1}</span>
                    <span aria-hidden="true" className="h-px w-10 bg-current opacity-35" />
                    <span>{frame.shape}</span>
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="Hero frame sequence" className="pointer-events-auto mt-8 flex w-fit items-center gap-1 border-t border-foreground/25 pt-3">
              {[...FRAME_STATES.map((frame) => frame.label), "Collection"].map((label, index) => (
                <button
                  key={`${label}-${index}`}
                  type="button"
                  data-hero-stop={index}
                  aria-label={index === 4 ? "Show the final collection slide" : `Show ${label}`}
                  aria-current={index === 0 ? "step" : undefined}
                  onClick={() => scrollToFrame(index)}
                  className="relative flex min-h-11 min-w-11 items-center justify-center px-2 text-xs tabular-nums text-foreground/50 transition-colors duration-500 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground aria-[current=step]:text-foreground after:absolute after:inset-x-2 after:bottom-1 after:h-px after:bg-current after:opacity-0 after:transition-opacity after:duration-500 aria-[current=step]:after:opacity-100"
                >
                  {index === 4 ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : `0${index + 1}`}
                </button>
              ))}
            </nav>
          </div>
          <div className="grid w-full overflow-hidden py-1 md:hidden">
            {FRAME_STATES.map((frame, index) => (
              <div
                key={frame.id}
                data-frame-study={frame.id}
                aria-hidden={index === 0 ? undefined : true}
                className={`col-start-1 row-start-1 flex items-center gap-5 will-change-[transform,opacity] ${index === 0 ? "" : "invisible opacity-0"}`}
              >
                <span className="flex flex-col gap-1.5 text-xs tabular-nums" aria-label={`Frame ${index + 1} of 4`}>
                  <span className="font-medium">0{index + 1}</span>
                  <span className="h-px w-4 bg-current opacity-40" aria-hidden="true" />
                  <span className="opacity-60">04</span>
                </span>
                <div className="border-l border-background/35 pl-5">
                  <p className="whitespace-nowrap text-[clamp(1.125rem,4.5vw,1.5rem)] font-normal uppercase leading-[1.25] tracking-[0.015em] [font-family:Boxing,sans-serif]">{frame.label}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-background/80">{frame.shape}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-50 h-px bg-background/20 md:bg-foreground/15"
        >
          <span
            data-scroll-progress
            className="block h-full w-full bg-background/80 md:bg-foreground/70"
          />
        </div>
      </div>
    </section>
  );
}
