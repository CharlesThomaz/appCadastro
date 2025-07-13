const form = document.getElementById("formBusca");
const resultado = document.getElementById("resultado");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nomeInput = document.getElementById("getByName");
  const nome = nomeInput?.value.trim() || "";

  if (!nome) {
    if(resultado) resultado.textContent = "Digite um nome.";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/user/pesquisar?getByName=${encodeURIComponent(nome)}`);

    if (!res.ok) {
      if(resultado) {
        resultado.textContent = res.status === 404 ? "Usuário não encontrado." : "Erro ao buscar usuário.";
      }
      return;
    }

    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      if(resultado) resultado.innerHTML = data.map(user => `
        <div>
          <strong>Usuário encontrado:</strong><br>
          👤 Nome: ${user.nameUser} <br>
          📧 Email: ${user.emailUser}
        </div>
      `).join('<hr>');
    } else {
      if(resultado) resultado.textContent = "Usuário não encontrado.";
    }

  } catch (err) {
    if(resultado) resultado.textContent = "Erro ao buscar usuário.";
    console.error(err);
  }
});
