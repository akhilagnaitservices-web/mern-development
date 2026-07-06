export const formatDate = (dateStr) => {
    if (!dateStr) return { day: '--', month: '---' }

    const d = new Date(dateStr)

    return {
        day: d.getDate().toString().padStart(2, '0'),
        month: d.toLocaleString('default', {
            month: 'short',
        }).toUpperCase(),
    }
}