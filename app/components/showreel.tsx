'use client'

import {
  ArrowClockwiseIcon,
  ArrowRightIcon,
  PlayIcon,
  SpeakerHighIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import poster from '@/public/video/showreel-poster.jpg'
import posterPortrait from '@/public/video/showreel-poster-4x5.jpg'

import {
  canAutoplayShowreel,
  getShowreelChapterIndex,
  showreelChapters,
  showreelVideo,
} from '../lib/showreel'

type PlayerState = 'idle' | 'playing' | 'paused' | 'ended'

const subscribeToPortrait = (onChange: () => void) => {
  const query = window.matchMedia(showreelVideo.portraitQuery)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const getPortrait = () => window.matchMedia(showreelVideo.portraitQuery).matches
const getServerPortrait = () => false

export default function Showreel() {
  const screenRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<PlayerState>('idle')
  const [chapter, setChapter] = useState(0)
  // muted = the silent in-view autoplay; any user action switches the sound on
  const [muted, setMuted] = useState(false)
  // phones get the 4:5 cut; the posters swap in CSS so there is no flash
  const isPortrait = useSyncExternalStore(
    subscribeToPortrait,
    getPortrait,
    getServerPortrait,
  )

  // Autoplay once, muted, when the player is mostly on screen (browsers only
  // allow silent autoplay). Pauses when scrolled away, resumes on return.
  useEffect(() => {
    const screen = screenRef.current
    const video = videoRef.current
    if (!screen || !video) return

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection
    const allowed = canAutoplayShowreel({
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches,
      saveData: connection?.saveData === true,
    })
    if (!allowed) return

    let started = false
    let pausedByScroll = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.6) {
          if (!started) {
            started = true
            video.muted = true
            setMuted(true)
            void video.play().catch(() => undefined)
          } else if (pausedByScroll) {
            pausedByScroll = false
            void video.play().catch(() => undefined)
          }
        } else if (
          entry.intersectionRatio < 0.25 &&
          video.muted &&
          !video.paused
        ) {
          pausedByScroll = true
          video.pause()
        }
      },
      { threshold: [0, 0.25, 0.6] },
    )
    observer.observe(screen)
    return () => observer.disconnect()
  }, [])

  const play = (from?: number) => {
    const video = videoRef.current
    if (!video) return

    // a click is a user gesture: always play with sound
    video.muted = false
    setMuted(false)
    if (from !== undefined) video.currentTime = from
    else if (state === 'ended') video.currentTime = 0

    void video.play().catch(() => setState('paused'))
  }

  const isIdle = state === 'idle'
  const isEnded = state === 'ended'

  return (
    <figure className="qclay-showreel">
      <div
        ref={screenRef}
        className="qclay-showreel-screen"
        data-state={state}
        data-muted={muted}
      >
        <video
          ref={videoRef}
          className="qclay-showreel-video"
          src={isPortrait ? showreelVideo.portraitSrc : showreelVideo.src}
          preload="none"
          playsInline
          controls={!isIdle && !isEnded && !muted}
          aria-label={showreelVideo.title}
          onPlay={() => setState('playing')}
          onPause={(event) => {
            if (!event.currentTarget.ended) setState('paused')
          }}
          onEnded={() => setState('ended')}
          onTimeUpdate={(event) =>
            setChapter(getShowreelChapterIndex(event.currentTarget.currentTime))
          }
        />

        <div className="qclay-showreel-cover" inert={!isIdle}>
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            placeholder="blur"
            className="qclay-showreel-poster qclay-showreel-poster--landscape"
          />
          <Image
            src={posterPortrait}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className="qclay-showreel-poster qclay-showreel-poster--portrait"
          />
          <button
            type="button"
            className="qclay-showreel-play interactive"
            onClick={() => play()}
            aria-label="Lire la vidéo de présentation, 30 secondes, avec le son"
          >
            <span className="qclay-showreel-play-icon">
              <PlayIcon size={26} weight="fill" aria-hidden="true" />
            </span>
            <span className="qclay-showreel-play-label">
              Voir la vidéo
              <span className="qclay-showreel-play-time">0:30</span>
            </span>
          </button>
        </div>

        {muted && !isEnded && (
          <button
            type="button"
            className="qclay-showreel-sound interactive"
            onClick={() => play(0)}
          >
            <SpeakerHighIcon size={18} weight="fill" aria-hidden="true" />
            Activer le son
          </button>
        )}

        {/* End screen: the video's final CTA, made clickable */}
        <div className="qclay-showreel-end" inert={!isEnded}>
          <p className="qclay-showreel-end-kicker">Réponse sous 24h ouvrées</p>
          <p className="qclay-showreel-end-title">Un projet en tête&nbsp;?</p>
          <div className="qclay-showreel-end-actions">
            <a
              href="#contact"
              className="qclay-showreel-end-cta qclay-button interactive"
            >
              Discuter de mon projet
              <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => play(0)}
              className="qclay-showreel-end-replay interactive"
            >
              <ArrowClockwiseIcon size={18} weight="bold" aria-hidden="true" />
              Revoir
            </button>
          </div>
        </div>
      </div>

      <figcaption className="qclay-showreel-chapters">
        <span className="sr-only">Chapitres de la vidéo</span>
        {showreelChapters.map((entry, index) => (
          <button
            key={entry.label}
            type="button"
            onClick={() => play(entry.start)}
            className="qclay-showreel-chapter interactive"
            data-active={!isIdle && index === chapter}
          >
            <span className="qclay-showreel-chapter-time">
              {entry.timestamp}
            </span>
            <span className="qclay-showreel-chapter-label">{entry.label}</span>
          </button>
        ))}
      </figcaption>
    </figure>
  )
}
