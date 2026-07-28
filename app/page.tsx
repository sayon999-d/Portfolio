import SiteFrame from '../components/SiteFrame';
import ParticleSphere from '../components/ParticleSphere';
import VaporizeTextCycle from '../components/VaporizeTextCycle';

export default function Page() {
  return (
    <SiteFrame shellClassName="home-page">
      <section className="landing-hero">
        <div className="home-intro">
          <div className="vaporize-stage">
            <VaporizeTextCycle
              texts={['SAYON MANNA', 'SAYON MANNA']}
              color="#17324d"
              spread={5.8}
              density={9}
              alignment="center"
              tag="div"
              font={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                fontWeight: 700,
                fontSize: 130,
                lineHeight: 1,
                letterSpacing: 0,
              }}
              style={{
                width: 'min(100%, 1120px)',
                minHeight: '210px',
                margin: '0 auto',
              }}
            />
          </div>
          <p className="eyebrow">Portfolio chapters</p>
          <h1 className="home-headline">Building AI systems that work in production</h1>
        </div>

        <div className="home-sphere-stage" aria-hidden="true">
          <ParticleSphere
            sphereColor="#64B5CA"
            particlesCount={1100}
            particleScale={0.065}
            speed={0.42}
            scale={1.15}
          />
        </div>
      </section>
    </SiteFrame>
  );
}
