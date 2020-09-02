function sort(dados) {
  return dados.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
}

function toast(addToast, mensagem, tipo, autoDismiss) {
  addToast(mensagem, {
    appearance: tipo,
    autoDismiss: autoDismiss || true,
  });
}

export default {
  sort,
  toast,
};
