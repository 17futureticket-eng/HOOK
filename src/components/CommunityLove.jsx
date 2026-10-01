import styles from './CommunityLove.module.css'

const TWEETS = [
  {
    name: 'GraiLeth',
    handle: '@graildoteth',
    avatar: 'G',
    avatarBg: '#4a1a2a',
    avatarColor: '#ff2d78',
    date: 'Aug 30, 2026',
    body: (
      <>
        My favorite project on RH <span className={styles.mention}>@Hookrfun</span> is crushing it. Happy ATH day for the project.
        <br /><br />
        <span className={styles.mention}>@Hookrfun</span> leveraged LP pool hooks bring something very unique to the table. Expecting this to only be the first of many unique and novel innovations brought to DeFi.
        <br /><br />
        DeFi will never be the same ONCE these hooks start to be used at scale.
      </>
    ),
  },
  {
    name: 'niko',
    handle: '@saintniko',
    avatar: 'n',
    avatarBg: '#1a2a3a',
    avatarColor: '#5b9bd5',
    date: 'Sep 4, 2026',
    body: 'we love Hookr',
  },
  {
    name: 'Uniswap',
    handle: '@Uniswap',
    avatar: '🦄',
    avatarBg: '#1a1a3a',
    avatarColor: '#a78bfa',
    date: 'Sep 17, 2026',
    body: (
      <>
        <span className={styles.mention}>@Hookrfun</span>
        <br />
        <span className={styles.mention}>@whatthehookv4</span> *Hooks mentioned*
      </>
    ),
  },
  {
    name: 'What The Hook',
    handle: '@whatthehookv4',
    avatar: '⚡',
    avatarBg: '#2a1a1a',
    avatarColor: '#f97316',
    date: 'Sep 4, 2026',
    body: (
      <>
        Our integration with <span className={styles.mention}>@Hookrfun</span> is now live.
        <br /><br />
        Anyone using HOOKR&apos;s UI can enable our module and get additional rewards from arbitrage value retention.
        <br /><br />
        Building with <span className={styles.mention}>@NodarJ</span> is an absolute banger of an experience.
      </>
    ),
  },
  {
    name: 'VEdu',
    handle: '@yashascore',
    avatar: 'V',
    avatarBg: '#1a2a1a',
    avatarColor: '#22c55e',
    date: 'Sep 4, 2026',
    body: (
      <>
        For me the <span className={styles.mention}>@Hookrfun</span> bet is that Uniswap v4 turns a pool into a venue with its own rules and that RH chain will need a default place to create, read and reuse those venues.
        <br /><br />
        Hookr is built as that place
      </>
    ),
  },
  {
    name: 'DineroDom',
    handle: '@DineroDom0',
    avatar: 'D',
    avatarBg: '#2a2a1a',
    avatarColor: '#eab308',
    date: 'Sep 4, 2026',
    body: (
      <>
        So <span className={styles.mention}>@Hookrfun</span> has just been an absolute partnership powerhouse. Clearly setting itself as the distribution layer for V4 hooks.
      </>
    ),
  },
]

export default function CommunityLove() {
  return (
    <section className={styles.section} id="community">
      <div className="section-label">On X</div>
      <div className="section-header">
        <h2>Community Love</h2>
        <a className="section-link" href="#">Follow @hookrfun ↗</a>
      </div>

      <div className={styles.scroll}>
        {TWEETS.map((t) => (
          <div key={t.handle + t.date} className={styles.card}>
            <div className={styles.user}>
              <div
                className={styles.avatar}
                style={{ background: t.avatarBg, color: t.avatarColor }}
              >
                {t.avatar}
              </div>
              <div>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.handle}>{t.handle}</div>
              </div>
            </div>
            <div className={styles.body}>{t.body}</div>
            <div className={styles.footer}>
              <span className={styles.date}>{t.date}</span>
              <span className={styles.xIcon}>𝕏</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
