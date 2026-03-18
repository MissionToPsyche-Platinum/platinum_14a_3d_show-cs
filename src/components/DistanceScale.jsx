import { useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function DistanceScale({ isMetric }) {
    useFrame((state) => {
        const textElement = document.getElementById('scale-text');
        const analogyElement = document.getElementById('scale-analogy');
        if (!textElement || !analogyElement) return;

        const camera = state.camera;
        const target = camera.userData.target || state.scene.position;
        const distanceToTarget = camera.position.distanceTo(target);

        const vFov = (camera.fov * Math.PI) / 180;
        const visibleHeight = 2 * distanceToTarget * Math.tan(vFov / 2);
        const visibleWidth = visibleHeight * camera.aspect;

        const screenWidth = window.innerWidth;
        const pixelsPerUnit = screenWidth / visibleWidth;
        const unitsForBar = 100 / pixelsPerUnit;

        const scaleFactor = isMetric ? 1000000 : 621371;
        const realWorldDistance = unitsForBar * scaleFactor;

        let displayValue = realWorldDistance;
        let unit = isMetric ? "km" : "mi";

        const ONE_LIGHTYEAR = isMetric ? 9460730472580 : 5878625370000;

        if (realWorldDistance >= ONE_LIGHTYEAR / 10) {
            displayValue = realWorldDistance / ONE_LIGHTYEAR;
            unit = "ly";
        } else if (realWorldDistance >= 1000000) {
            displayValue = realWorldDistance / 1000000;
            unit = isMetric ? "Million km" : "Million mi";
        }

        if ((unit === "mi" || unit === "km" || unit === "Million mi" || unit === "Million km") && displayValue > 1000) {
            textElement.innerText = `${Math.round(displayValue).toLocaleString()} ${unit}`;
        } else {
            textElement.innerText = `${displayValue.toFixed(1)} ${unit}`;
        }

        const speedOfLight = isMetric ? 299792 : 186282;
        const lightSeconds = realWorldDistance / speedOfLight;

        let analogyText = "";
        if (lightSeconds < 60) {
            analogyText = `≈ ${Math.round(lightSeconds)} Light-Seconds`;
        } else if (lightSeconds < 3600) {
            analogyText = `≈ ${(lightSeconds / 60).toFixed(1)} Light-Minutes`;
        } else {
            analogyText = `≈ ${(lightSeconds / 3600).toFixed(1)} Light-Hours`;
        }

        analogyElement.innerText = analogyText;
    });

    return null;
}

export function DistanceScaleUI({ isMetric, setIsMetric }) {
    const [showScaleInfo, setShowScaleInfo] = useState(false);

    return (
        <div
            onClick={() => setIsMetric(!isMetric)}
            style={{
                position: 'fixed', bottom: '30px', right: '30px', display: 'flex', flexDirection: 'column',
                alignItems: 'flex-end', zIndex: 1010, pointerEvents: 'auto', cursor: 'pointer',
                fontFamily: 'sans-serif', fontVariantNumeric: 'tabular-nums', textShadow: '1px 1px 2px black'
            }}
            onMouseEnter={() => setShowScaleInfo(true)}
            onMouseLeave={() => setShowScaleInfo(false)}
        >
            <div style={{
                position: 'absolute', bottom: '100%', right: '0', marginBottom: '15px', width: '260px',
                padding: '12px 16px', backgroundColor: 'rgba(10, 10, 10, 0.85)', border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px', color: '#e0e0e0', fontSize: '12px', lineHeight: '1.5', textAlign: 'right',
                backdropFilter: 'blur(4px)', boxShadow: '0px 4px 15px rgba(0,0,0,0.5)',
                opacity: showScaleInfo ? 1 : 0, transform: showScaleInfo ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', pointerEvents: 'none'
            }}>
                This scale indicates the physical distance represented by the 100px line below. <br /><br />
                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Click to toggle between Metric (km) and Imperial (mi).</span>
            </div>

            <div id="scale-text" style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>Calculating...</div>
            <div id="scale-analogy" style={{ color: '#aaaaaa', fontSize: '11px', marginBottom: '4px', fontStyle: 'italic' }}></div>

            <div style={{
                width: '100px', height: '6px', borderBottom: '2px solid white', borderLeft: '2px solid white',
                borderRight: '2px solid white', boxShadow: '0px 1px 2px rgba(0,0,0,0.5)',
                opacity: showScaleInfo ? 1 : 0.8, transition: 'opacity 0.3s',
            }} />
        </div>
    );
}