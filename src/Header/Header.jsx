import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Menu_Bar = ({ title, ClickHandler }) => {

    // Title Animation
    const titleRef = useRef(null);
    useEffect(() => {
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 90%',
                        end: 'bottom 20%',
                        toggleActions: "play none none reverse"
                    },
                }
            )
        }
    }, []);
    return (
        <div className={styles.MenuContainer} onClick={ClickHandler}>
            <div className={styles.right}>
                <span className={styles.RightTitle} ref={titleRef}>{title}</span>
            </div>
        </div>
    );
};

export default function Header() {

    const [isVisible, setVisible] = useState(-1);
    const handleCloseButtonClick = () => {
        setVisible(-1);
    };

    //   Box Animation
    const BoxRef = useRef(null);
    useEffect(() => {
        if (BoxRef.current && isVisible >= 0) {
            gsap.fromTo(
                BoxRef.current,
                {
                    opacity: 0,
                    scale: 0.5,
                    y: 100,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "circ.inOut",
                    duration: 0.8,
                }
            );
        }
    }, [isVisible]);

    const menuItems = [
        {
            // Education
            title: 'Education',
            CenterText: (
                <>
                 <div className={styles.flexBox1}>
                    <h1>Education</h1>
                    <h2>42tokyo エンジニアリングスクール2年半在籍</h2>
                    <ul>
                        <li>C言語を中心としたプログラミング学習</li>
                        <li>コンピュータグラフィックアルゴリズムの理解と実践</li>
                        <li>Linuxシステム管理とセキュリティに関する習得</li>
                        <li>マルチスレッドプログラミングの技術習得</li>
                        <li>Dockerを用いたコンテナ管理のスキル取得</li>
                        <li>チームweb開発を通じてフロントエンドデザインの習得</li>
                    </ul>
                 </div>

                <div className={styles.flexBox2}>
                    <img src='/42Tokyo1.jpg' alt=''/>
                </div>
                </>
            )
        },
        {
            // Skill
            title: 'Skills',
            CenterText: (
                <>
                    <div className={styles.flexBox1}>
                        <h1>Skills</h1>
                        <h2>エンジニアリング</h2>
                        <ul>
                            <li>プログラミング言語: C C++ JavaScript</li>
                            <li>フレームワーク: React</li>
                            <li>マークアップ言語: HTML CSS</li>
                            <li>デザインツール: Figma</li>
                            <li>システム管理: Docker Linux</li>
                            <br />
                            <li>日本語 ネイティブ</li>
                            <li>ポルトガル語 ネイティブレベル</li>
                            <li>英語 ビジネスレベル</li>
                        </ul>
                    </div>

                    <div className={styles.flexBox2}>
                            <img src='/logo.png' alt=''/>
                    </div>
                </>
            )
        },
        {
            // Experience
            title: 'Experience',
            CenterText: (
                <>
                <div className={styles.flexBox1}>
                    <h1>Experience</h1>
                    <h2>42tokyoにおける<br />チームプロジェクト</h2>
                    <ul>
                        <li>Linuxシステム管理技術を実践したインフラ構築</li>
                        <li>Dockerを用いたコンテナ化による効率的な<br />デプロイメントの実現</li>
                        <li>フロントエンド開発とデザインにおいて<br />
                            JavaScript、React、HTML、CSS、Figmaを活用</li>
                    </ul>
                </div>
                <div className={styles.flexBox2}>
                    <img src='/MyPicture2.png' alt=''/>
                </div>
                </>
            )
        },
        {
            title: 'Projects',
            CenterText: (
                <>
                <div className={styles.flexBox2}>
                    <video controls className={styles.video}>
                        <source src='/video.mp4' type='video/mp4' />
                    </video>
                </div>
                </>
            )
        },
    ];

    return (
        <div className={styles.container}>
            {menuItems.map((item, index) => (
                <Menu_Bar
                    ClickHandler={() => { setVisible(index) }}
                    key={index}
                    title={item.title}
                    isVisible={isVisible >= 0}
                />
            ))}
            {/* 真ん中に出す部分CenterBoxContainer */}
            <div className={`${styles.CenterBoxContainer} ${isVisible >= 0 ? styles.visible : styles.hidden}`}>
                <div className={styles.CenterBox} ref={BoxRef}>
                    <button className={styles.CloseButton} onClick={handleCloseButtonClick}>&times;</button>
                    {isVisible >= 0 && menuItems[isVisible].CenterText}
                </div>
            </div>
        </div>
    );
}