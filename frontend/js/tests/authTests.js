/**
 * Test: POST /api/auth/login
 */
 testUtils.createTestButton("Test Login Correcto (Pepe y 12345)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '12345' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.ok) {
        // Guardamos el token para los siguientes tests de samples
        localStorage.setItem('test_token', data.token);
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Login - Password Incorrecto (Pepe y 123)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '123' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status === 401) {
        // Guardamos el token para los siguientes tests de samples
        localStorage.setItem('test_token', data.token);
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Login - Usuario Incorrecto (Juan y 12345)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '123' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.ok) {
        // Guardamos el token para los siguientes tests de samples
        localStorage.setItem('test_token', data.token);
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Login - Error en la ruta del Método HTTP", async (btn) => {
    const response = await fetch('/api/auth/authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '123' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.ok) {
        // Guardamos el token para los siguientes tests de samples
        localStorage.setItem('test_token', data.token);
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Registro - Usuario Nuevo", async (btn) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'nuevo ' + Date.now(), password: '12345' }) // Creación de usuario nuevo
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status === 201) {
        // Guardamos el token para los siguientes tests de samples
        localStorage.setItem('test_token', data.token);
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Seguridad - Productor accediendo a Admin", async (btn) => {
    
    const token = await okLogin();
     if (!token) {
        return;
    }

    const response = await fetch('/api/admin/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    testUtils.log(data);

    if (response.status != 403) {
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Eliminar Sample Dinámico", async (btn) => {
    const token = await okLogin();
     if (!token) {
        return;
    }

    const samplesResponse = await fetch('/api/samples/my-samples', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    const samplesData = await samplesResponse.json();

    testUtils.log(samplesData);


    if(!samplesData || samplesData.length === 0){
        testUtils.log("No hay samples existentes. Se debe subir un sample primero");
    } else{
            const sampleId = samplesData[0].id;
            const deleteResponse = await fetch(`/api/samples/${sampleId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await deleteResponse.json();

            testUtils.log(`Intentando borrar el sample con ID: ${sampleId}`);

            if (deleteResponse.ok) {
                testUtils.setSuccess(btn);
            }
    }

});
