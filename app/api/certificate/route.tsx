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

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            width: '1123px',
            height: '794px',
            display: 'flex',
            background: 'linear-gradient(to bottom, #ffffff 0%, #fefefe 50%, #fcfcfc 100%)',
            position: 'relative',
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
              boxShadow: 'inset 0 0 0 1px rgba(244, 228, 193, 0.5)',
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
              top: '45px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logoUrl}
              alt="Logo"
              width="140"
              height="70"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Rosette Badge - Left Side */}
          <div
            style={{
              position: 'absolute',
              left: '25px',
              top: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Rosette Circle */}
            <div
              style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #C9A961 0%, #F4E4C1 25%, #D4AF37 50%, #F4E4C1 75%, #B8860B 100%)',
                borderRadius: '50%',
                border: '4px solid #B8860B',
                display: 'flex',
                position: 'relative',
              }}
            />
            {/* Left Ribbon */}
            <div
              style={{
                position: 'absolute',
                top: '75px',
                left: '15px',
                width: '35px',
                height: '85px',
                background: 'linear-gradient(180deg, #8B0000 0%, #6B0000 100%)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
                border: '2px solid #D4AF37',
                transform: 'rotate(12deg)',
                display: 'flex',
              }}
            />
            {/* Right Ribbon */}
            <div
              style={{
                position: 'absolute',
                top: '75px',
                right: '15px',
                width: '35px',
                height: '85px',
                background: 'linear-gradient(180deg, #8B0000 0%, #6B0000 100%)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
                border: '2px solid #D4AF37',
                transform: 'rotate(-12deg)',
                display: 'flex',
              }}
            />
          </div>

          {/* Main Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              paddingTop: '135px',
            }}
          >
            {/* Certificate Title */}
            <div
              style={{
                fontSize: '82px',
                letterSpacing: '16px',
                color: '#1a1a1a',
                fontWeight: 700,
                marginBottom: '8px',
                fontFamily: 'serif',
                display: 'flex',
              }}
            >
              CERTIFICATE
            </div>

            {/* Of Participation Badge */}
            <div
              style={{
                fontSize: '24px',
                color: '#ffffff',
                background: '#8B0000',
                letterSpacing: '10px',
                fontWeight: 700,
                padding: '10px 50px',
                border: '3px solid #D4AF37',
                marginBottom: '35px',
                display: 'flex',
              }}
            >
              OF PARTICIPATION
            </div>

            {/* Intro Text */}
            <div
              style={{
                fontSize: '18px',
                color: '#555',
                marginBottom: '18px',
                fontFamily: 'serif',
                fontStyle: 'italic',
                display: 'flex',
              }}
            >
              This recognition is proudly presented to:
            </div>

            {/* Name with Underline */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  fontSize: '64px',
                  color: '#000',
                  fontFamily: 'cursive',
                  paddingBottom: '8px',
                  display: 'flex',
                }}
              >
                {name}
              </div>
              <div
                style={{
                  width: '450px',
                  height: '3px',
                  background: '#D4AF37',
                  display: 'flex',
                }}
              />
            </div>

            {/* Description Text */}
            <div
              style={{
                fontSize: '17px',
                lineHeight: 1.7,
                width: '750px',
                color: '#333',
                textAlign: 'center',
                fontFamily: 'serif',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <span style={{ display: 'flex' }}>has successfully completed </span>
              <span style={{ color: '#8B0000', fontWeight: 700, display: 'flex', margin: '0 5px' }}>The Happiness Index Assessment</span>
              <span style={{ display: 'flex' }}> based on The Joy Spectrum Framework and has taken a meaningful step towards greater self-awareness, emotional clarity, and well-being.</span>
            </div>
          </div>

          {/* Footer - Date and Signature */}
          <div
            style={{
              position: 'absolute',
              bottom: '50px',
              left: '120px',
              right: '120px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            {/* Date Section */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '280px',
              }}
            >
              <div
                style={{
                  fontFamily: 'cursive',
                  fontSize: '40px',
                  color: '#000',
                  marginBottom: '5px',
                  display: 'flex',
                }}
              >
                {formattedDate}
              </div>
              <div
                style={{
                  width: '100%',
                  height: '2px',
                  background: '#2a2a2a',
                  marginBottom: '10px',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#8B0000',
                  letterSpacing: '1.5px',
                  display: 'flex',
                }}
              >
                DATE OF ISSUANCE
              </div>
            </div>

            {/* Signature Section */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '280px',
              }}
            >
              <div
                style={{
                  fontFamily: 'cursive',
                  fontSize: '40px',
                  color: '#000',
                  marginBottom: '5px',
                  display: 'flex',
                }}
              >
                Dr. Vrushali
              </div>
              <div
                style={{
                  width: '100%',
                  height: '2px',
                  background: '#2a2a2a',
                  marginBottom: '10px',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#8B0000',
                  letterSpacing: '1.5px',
                  marginBottom: '5px',
                  display: 'flex',
                }}
              >
                DR. VRUSHALI SARASWAT
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#666',
                  fontStyle: 'italic',
                  display: 'flex',
                }}
              >
                Holistic Happiness Coach
              </div>
            </div>
          </div>

          {/* Corner Ornaments */}
          <div
            style={{
              position: 'absolute',
              top: '55px',
              left: '55px',
              width: '50px',
              height: '50px',
              borderTop: '2px solid #D4AF37',
              borderLeft: '2px solid #D4AF37',
              opacity: 0.2,
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '55px',
              right: '55px',
              width: '50px',
              height: '50px',
              borderTop: '2px solid #D4AF37',
              borderRight: '2px solid #D4AF37',
              opacity: 0.2,
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '55px',
              left: '55px',
              width: '50px',
              height: '50px',
              borderBottom: '2px solid #D4AF37',
              borderLeft: '2px solid #D4AF37',
              opacity: 0.2,
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '55px',
              right: '55px',
              width: '50px',
              height: '50px',
              borderBottom: '2px solid #D4AF37',
              borderRight: '2px solid #D4AF37',
              opacity: 0.2,
              display: 'flex',
            }}
          />
        </div>
      ),
      {
        width: 1123,
        height: 794,
      }
    );

    // Convert ImageResponse to Response with download headers
    const response = new Response(imageResponse.body, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="Certificate_${name.replace(/\s+/g, '_')}.png"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

    return response;
  } catch (error) {
    console.error('Certificate generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate certificate' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
