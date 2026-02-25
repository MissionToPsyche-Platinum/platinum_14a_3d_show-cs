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

        // DYNAMIC SCALE FACTORS
        // 1 Three.js unit = 1,000,000 km OR 621,371 miles
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
            unit = isMetric ? "M km" : "M mi";
        }

        if ((unit === "mi" || unit === "km") && displayValue > 1000) {
            textElement.innerText = `${Math.round(displayValue).toLocaleString()} ${unit}`;
        } else {
            textElement.innerText = `${displayValue.toFixed(1)} ${unit}`;
        }

        // Analogy for Reference (Speed of Light)
        const speedOfLight = isMetric ? 299792 : 186282; // km/s vs mi/s
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