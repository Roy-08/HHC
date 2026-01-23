import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const score = searchParams.get('score');

    if (!name || !score) {
      return new Response('Name and score are required', { status: 400 });
    }

    // Get current date
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    // Fetch custom fonts - using correct direct font URLs
    const [playfairBold, greatVibes, montserratBold, cormorantRegular] = await Promise.all([
      fetch('https://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.woff2').then(res => res.arrayBuffer()),
      fetch('https://fonts.gstatic.com/s/greatvibes/v19/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlq.woff2').then(res => res.arrayBuffer()),
      fetch('https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.woff2').then(res => res.arrayBuffer()),
      fetch('https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_w.woff2').then(res => res.arrayBuffer()),
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            width: '1123px',
            height: '794px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, #ffffff 0%, #fefefe 50%, #fcfcfc 100%)',
            position: 'relative',
            fontFamily: 'Montserrat',
          }}
        >
          {/* Main Border Frame */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '30px',
              right: '30px',
              bottom: '30px',
              border: '3px solid #D4AF37',
              display: 'flex',
              boxShadow: 'inset 0 0 0 1px #F4E4C1',
            }}
          />
          
          {/* Inner Border */}
          <div
            style={{
              position: 'absolute',
              top: '38px',
              left: '38px',
              right: '38px',
              bottom: '38px',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              display: 'flex',
            }}
          />

          {/* Top Left Decorative Corner */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '520px',
              height: '200px',
              background: 'linear-gradient(135deg, #C9A961 0%, #F4E4C1 25%, #D4AF37 50%, #F4E4C1 75%, #B8860B 100%)',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              opacity: 0.95,
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '490px',
              height: '185px',
              background: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              display: 'flex',
            }}
          />

          {/* Bottom Right Decorative Corner */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '320px',
              height: '150px',
              background: 'linear-gradient(135deg, #C9A961 0%, #F4E4C1 25%, #D4AF37 50%, #F4E4C1 75%, #B8860B 100%)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              opacity: 0.95,
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '300px',
              height: '135px',
              background: 'linear-gradient(225deg, #8B0000 0%, #6B0000 100%)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              display: 'flex',
            }}
          />

          {/* Vertical Ribbon */}
          <div
            style={{
              position: 'absolute',
              right: '15px',
              top: 0,
              bottom: 0,
              width: '35px',
              background: 'linear-gradient(135deg, #C9A961 0%, #F4E4C1 25%, #D4AF37 50%, #F4E4C1 75%, #B8860B 100%)',
              display: 'flex',
            }}
          />

          {/* Top Flag */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: '8px',
              width: '48px',
              height: '150px',
              background: 'linear-gradient(180deg, #8B0000 0%, #6B0000 100%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)',
              display: 'flex',
            }}
          />

          {/* Rosette Badge */}
          <div
            style={{
              position: 'absolute',
              left: '5px',
              top: '90px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Ribbons */}
            <div
              style={{
                position: 'absolute',
                top: '90px',
                left: '10px',
                width: '42px',
                height: '100px',
                background: 'linear-gradient(180deg, #8B0000 0%, #6B0000 100%)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                border: '2px solid #D4AF37',
                transform: 'rotate(15deg)',
                display: 'flex',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '90px',
                right: '10px',
                width: '42px',
                height: '100px',
                background: 'linear-gradient(180deg, #8B0000 0%, #6B0000 100%)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                border: '2px solid #D4AF37',
                transform: 'rotate(-15deg)',
                display: 'flex',
              }}
            />
            {/* Circle */}
            <div
              style={{
                width: '145px',
                height: '145px',
                background: 'linear-gradient(135deg, #C9A961 0%, #F4E4C1 25%, #D4AF37 50%, #F4E4C1 75%, #B8860B 100%)',
                borderRadius: '50%',
                border: '5px solid #B8860B',
                display: 'flex',
              }}
            />
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '82%',
              marginTop: '-20px',
            }}
          >
            {/* Certificate Title */}
            <div
              style={{
                fontSize: '88px',
                letterSpacing: '18px',
                color: '#1a1a1a',
                textTransform: 'uppercase',
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                marginBottom: '5px',
                display: 'flex',
              }}
            >
              CERTIFICATE
            </div>

            {/* OF PARTICIPATION Badge */}
            <div
              style={{
                fontFamily: 'Montserrat',
                fontSize: '26px',
                color: '#ffffff',
                background: '#8B0000',
                letterSpacing: '12px',
                fontWeight: 700,
                marginBottom: '30px',
                padding: '12px 40px',
                border: '3px solid #D4AF37',
                display: 'flex',
              }}
            >
              OF PARTICIPATION
            </div>

            {/* Intro Text */}
            <div
              style={{
                fontStyle: 'italic',
                fontSize: '19px',
                color: '#555',
                fontFamily: 'Cormorant Garamond',
                marginBottom: '15px',
                display: 'flex',
              }}
            >
              This recognition is proudly presented to:
            </div>

            {/* Name */}
            <div
              style={{
                fontFamily: 'Great Vibes',
                fontSize: '70px',
                color: '#000',
                borderBottom: '3px solid #D4AF37',
                padding: '0 70px 10px',
                margin: '10px 0 25px 0',
                display: 'flex',
              }}
            >
              {name}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '18px',
                lineHeight: 1.8,
                maxWidth: '780px',
                color: '#333',
                fontFamily: 'Cormorant Garamond',
                fontWeight: 700,
                textAlign: 'center',
                display: 'flex',
              }}
            >
              has successfully completed <span style={{ color: '#8B0000', fontWeight: 700, marginLeft: '8px', marginRight: '8px' }}>The Happiness Index Assessment</span> based on The Joy Spectrum Framework and has taken a meaningful step towards greater self-awareness, emotional clarity, and well-being.
            </div>
          </div>

          {/* Footer Signatures */}
          <div
            style={{
              position: 'absolute',
              bottom: '55px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 150px',
            }}
          >
            {/* Date */}
            <div
              style={{
                width: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'Great Vibes',
                  fontSize: '45px',
                  color: '#000',
                  marginBottom: '-8px',
                  height: '65px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {formattedDate}
              </div>
              <div
                style={{
                  width: '100%',
                  borderTop: '2px solid #2a2a2a',
                  marginBottom: '12px',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#8B0000',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
              >
                DATE OF ISSUANCE
              </div>
            </div>

            {/* Signature */}
            <div
              style={{
                width: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'Great Vibes',
                  fontSize: '45px',
                  color: '#000',
                  marginBottom: '-8px',
                  height: '65px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Dr. Vrushali
              </div>
              <div
                style={{
                  width: '100%',
                  borderTop: '2px solid #2a2a2a',
                  marginBottom: '12px',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#8B0000',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
              >
                DR. VRUSHALI SARASWAT
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#666',
                  fontFamily: 'Montserrat',
                  marginTop: '5px',
                  fontStyle: 'italic',
                  display: 'flex',
                }}
              >
                Holistic Happiness Coach
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1123,
        height: 794,
        fonts: [
          {
            name: 'Playfair Display',
            data: playfairBold,
            weight: 700,
            style: 'normal',
          },
          {
            name: 'Great Vibes',
            data: greatVibes,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Montserrat',
            data: montserratBold,
            weight: 700,
            style: 'normal',
          },
          {
            name: 'Cormorant Garamond',
            data: cormorantRegular,
            weight: 400,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    console.error('Certificate generation error:', error);
    return new Response('Failed to generate certificate', { status: 500 });
  }
}
