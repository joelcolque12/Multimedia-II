// Creación de la escena
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camara.position.z = 3;

// Crear el renderizador
const renderizador = new THREE.WebGLRenderer({ antialias: true });
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.shadowMap.enabled = true; 
document.body.appendChild(renderizador.domElement);

// Agregar luz ambiental
const luzAmbiental = new THREE.AmbientLight(0x404040, 2);
escena.add(luzAmbiental);

// Agregar luz direccional
const luzDireccional = new THREE.DirectionalLight(0xffffff, 1);
luzDireccional.position.set(3, 3, 3);
luzDireccional.castShadow = true;
escena.add(luzDireccional);

// Cargar la textura de la esfera
const cargadorTextura = new THREE.TextureLoader();
const texturaEsfera = cargadorTextura.load('esferasinfondo.png');

// Crear una esfera con la textura aplicada
const geometriaEsfera = new THREE.SphereGeometry(1, 16, 16);
const materialEsfera = new THREE.MeshStandardMaterial({ 
    map: texturaEsfera, // Aplicar la imagen
    metalness: 0.3, 
    roughness: 0.1 
});

const esfera = new THREE.Mesh(geometriaEsfera, materialEsfera);
esfera.castShadow = true;
escena.add(esfera);

// Animación de la esfera
function animacion() {
    requestAnimationFrame(animacion);
    esfera.rotation.y += 0.01; // Gira sobre su propio eje
    renderizador.render(escena, camara);
}

animacion();

// Ajustar tamaño al cambiar la ventana
window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});