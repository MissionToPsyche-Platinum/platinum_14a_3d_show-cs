import { useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function DistanceScale({ isMetric }) {
    useFrame((state) => {
        const textElement    = document.getElementById('scale-text');
        const analogyElement = document.getElementById('scale-analogy');
        const wrapElement    = document.getElementById('distance-scale-wrap');
        if (!textElement || !analogyElement || !wrapElement) return;

        // Hide when the footer is near (within 350px of bottom of page)
        const distFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
        const scrollVH = window.scrollY / window.innerHeight;

        // Only show during solar system scenes (matches visibility configs)
        const inSolarSystemScene =
            (scrollVH >= 2.35 && scrollVH <= 5.15) ||
            (scrollVH >= 7.85 && scrollVH <= 20.15);

        const shouldHide = distFromBottom < 350 || !inSolarSystemScene;
        wrapElement.style.opacity       = shouldHide ? '0' : '1';
        wrapElement.style.pointerEvents = shouldHide ? 'none' : 'auto';

        // --- Original calculation logic (unchanged) ---
        const camera = state.camera;
        const target = camera.userData.target || state.scene.position;
        const distanceToTarget = camera.position.distanceTo(target);

        const vFov = (camera.fov * Math.PI) / 180;
        const visibleHeight = 2 * distanceToTarget * Math.tan(vFov / 2);
        const visibleWidth  = visibleHeight * camera.aspect;

        const screenWidth    = window.innerWidth;
        const pixelsPerUnit  = screenWidth / visibleWidth;
        const unitsForBar    = 100 / pixelsPerUnit;

        const scaleFactor      = isMetric ? 1000000 : 621371;
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
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div
            id="distance-scale-wrap"
            className="distance-scale"
            onClick={() => setIsMetric(!isMetric)}
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
        >
            <div className={`distance-scale__tooltip${showInfo ? ' distance-scale__tooltip--visible' : ''}`}>
                This bar represents 100px of real physical distance.
                <br /><br />
                <strong>Click to toggle between km and mi.</strong>
            </div>

            <div id="scale-text"    className="distance-scale__value">Calculating...</div>
            <div id="scale-analogy" className="distance-scale__analogy"></div>
            <div className="distance-scale__bar">
                <div className="distance-scale__tick distance-scale__tick--major" style={{ left: '0%' }} />
                <div className="distance-scale__tick distance-scale__tick--minor" style={{ left: '25%' }} />
                <div className="distance-scale__tick distance-scale__tick--half"  style={{ left: '50%' }} />
                <div className="distance-scale__tick distance-scale__tick--minor" style={{ left: '75%' }} />
                <div className="distance-scale__tick distance-scale__tick--major" style={{ left: '100%' }} />
                <div className="distance-scale__line" />
            </div>
        </div>
    );
}
