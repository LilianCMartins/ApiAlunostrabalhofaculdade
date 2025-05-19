const API_URL = "http://leoproti.com.br:8004/alunos";

// Carrega todos os alunos na tabela (GET)
async function carregarAlunos() {
  const resp = await fetch(API_URL);
  const alunos = await resp.json();
  const tbody = document.getElementById("alunosBody");
  tbody.innerHTML = "";

  alunos.forEach((aluno) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.id}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.turma}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.matricula}</td>
      <td>
        <button onclick="editarAluno(${aluno.id})">Editar</button>
        <button onclick="excluirAluno(${aluno.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Cadastra um novo aluno (POST)
document.getElementById("alunoForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const turma = document.getElementById("turma").value.trim();
  const curso = document.getElementById("curso").value.trim();
  const matricula = document.getElementById("matricula").value.trim();

  if (!nome || !turma || !curso || !matricula) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, turma, curso, matricula }),
    });

    if (!resp.ok) throw new Error("Erro ao cadastrar aluno.");

    alert("Aluno cadastrado com sucesso!");
    this.reset();
    carregarAlunos();
  } catch (err) {
    alert("Erro: " + err.message);
  }
});

// Edita um aluno (PUT)
async function editarAluno(id) {
  const nome = prompt("Novo nome:");
  const turma = prompt("Nova turma:");
  const curso = prompt("Novo curso:");
  const matricula = prompt("Nova matrícula:");

  if (!nome || !turma || !curso || !matricula) {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  try {
    const resp = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, turma, curso, matricula }),
    });

    if (!resp.ok) throw new Error("Erro ao editar aluno.");

    alert("Aluno atualizado com sucesso!");
    carregarAlunos();
  } catch (err) {
    alert("Erro: " + err.message);
  }
}

// Exclui um aluno (DELETE)
async function excluirAluno(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este aluno?");
  if (!confirmar) return;

  try {
    const resp = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!resp.ok) throw new Error("Erro ao excluir aluno.");

    alert("Aluno excluído com sucesso!");
    carregarAlunos();
  } catch (err) {
    alert("Erro: " + err.message);
  }
}

// Carregamento inicial automático
carregarAlunos();