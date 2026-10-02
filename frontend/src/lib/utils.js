export function formatDate(date) {
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}