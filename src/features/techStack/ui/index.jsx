import { useAppSelector } from "@/app/store/hooks";
import cls from './style.module.scss';
import AnimatedText from '@/shared/ui/animatedText/AnimatedText';

export default function TechStack() {
    const isLoading = useAppSelector((state) => state.preloader.isLoading);

    return (
        <section className={cls.techStack}>
            <div className={`container ${cls.container}`}>
                <h2>
                    <AnimatedText
                        text="Tech Stack"
                        delay={1}
                        triggerAnimation={!isLoading}
                    />
                </h2>

                <div className={cls.gridCards}>

                </div>
            </div>
        </section>
    )
}