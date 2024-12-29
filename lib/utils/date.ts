export function formatDate(dateString: string): string {  
    return new Date(dateString).toLocaleDateString('id-ID', {  
      day: 'numeric',  
      month: 'long',  
      year: 'numeric'  
    })  
  }