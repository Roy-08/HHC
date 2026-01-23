import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const score = searchParams.get('score');

    if (!name || !score) {
      return new Response(
        JSON.stringify({ error: 'Name and score are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get current date in "1 Jan 2026" format
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    // Get logo URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const logoUrl = `${baseUrl}/logo.png`;

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
            fontFamily: 'system-ui',
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
              border: '1px solid #D4AF37',
              opacity: 0.5,
              display: 'flex',
            }}
          />

          {/* Top Left Gold Corner */}
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
          
          {/* Top Left Red Corner */}
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

          {/* Bottom Right Gold Corner */}
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
          
          {/* Bottom Right Red Corner */}
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

          {/* Logo */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              width: '160px',
              height: '80px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logoUrl}
              alt="Logo"
              width="160"
              height="80"
              style={{ objectFit: 'contain' }}
            />
          </div>

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
            {/* Rosette Circle */}
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
            {/* Left Ribbon */}
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
            {/* Right Ribbon */}
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
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '82%',
              marginTop: '140px',
            }}
          >
            {/* Certificate Title */}
            <h1
              style={{
                fontSize: '88px',
                letterSpacing: '18px',
                color: '#1a1a1a',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '5px',
              }}
            >
              CERTIFICATE
            </h1>

            {/* Of Participation Badge */}
            <div
              style={{
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
            <p
              style={{
                fontStyle: 'italic',
                fontSize: '19px',
                color: '#555',
                marginBottom: '15px',
              }}
            >
              This recognition is proudly presented to:
            </p>

            {/* Name */}
            <div
              style={{
                fontSize: '70px',
                color: '#000',
                borderBottom: '3px solid #D4AF37',
                padding: '0 70px 10px',
                margin: '10px 0 25px 0',
                fontFamily: 'cursive',
                display: 'flex',
              }}
            >
              {name}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.8,
                maxWidth: '780px',
                color: '#333',
                fontWeight: 700,
              }}
            >
              has successfully completed <span style={{ color: '#8B0000' }}>The Happiness Index Assessment</span> based on The Joy Spectrum Framework and has taken a meaningful step towards greater self-awareness, emotional clarity, and well-being.
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '55px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 150px',
              alignItems: 'center',
            }}
          >
            {/* Date Section */}
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
                  fontFamily: 'cursive',
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
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#8B0000',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                DATE OF ISSUANCE
              </div>
            </div>

            {/* Signature Section */}
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
                  fontFamily: 'cursive',
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
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#8B0000',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                DR. VRUSHALI SARASWAT
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '5px',
                  fontStyle: 'italic',
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
      }
    );
  } catch (error) {
    console.error('Certificate generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate certificate' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}