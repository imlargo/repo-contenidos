import type { SearchResult } from '$src/lib/types/types';
import { SearchOptions } from '$src/lib/utils/enums';
import { goto } from '$app/navigation';

export class SearchStore {
	isLoading = $state(false);
	searchBy: SearchOptions = $state(SearchOptions.NOMBRE);
	searchValue = $state('');
	results: SearchResult[] = $state([]);

	async search() {
		if (this.searchValue === '') {
			return;
		}

		this.isLoading = true;

		if (this.searchBy === SearchOptions.CODIGO) {
			await goto(`/asignatura?codigo=${this.searchValue}`);
		}

		if (this.searchBy === SearchOptions.NOMBRE) {
			const response = await fetch(`/api/search/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ searchText: this.searchValue })
			});

			if (response.ok) {
				this.results = await response.json();
			}
		}

		this.isLoading = false;
	}
}
