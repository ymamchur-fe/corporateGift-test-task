import { defineStore } from 'pinia';
import axios from 'axios';
import {RouteParamValue} from "vue-router";

const BASE_URL = 'https://swapi.dev/api/people/';

// Define the Gender type
type Gender = 'male' | 'female' | 'n/a';

export interface IPerson {
    id: string
    name: string;
    eye_color: string;
    gender: Gender;
    birth_year: string;
    url: string;
}

// Helper function to get `id` from person.url property
function extractIdFromUrl(url: string): string {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
}

// Helper function to filter out characters based on name criteria
function filterPeople(people: IPerson[]): IPerson[] {
    return people.filter(person => !person.name.match(/^[LNC]/i));
}

// Helper function to add `id` property to person
function mapPerson(person: IPerson): IPerson {
    person.id = extractIdFromUrl(person.url)
    return person
}

// Helper function to count the number of characters by gender
function countGender(people: IPerson[], gender: Gender): number {
    return people.filter(person => person.gender === gender).length;
}

// Helper function to count loading progress
function countLoading(loaded: number, total: number): number {
    return total > 0 ? Math.round((loaded / total) * 100) :0
}

export const usePeopleStore = defineStore('people', {
    state: () => ({
        people: [] as IPerson[],
        loading: false,
        loadedCount: 0,
        totalCount: 0,
    }),
    getters: {
        menCount: (state) => countGender(state.people, 'male'),
        womenCount: (state) => countGender(state.people, 'female'),
        loadingProgress: (state) => countLoading(state.loadedCount, state.totalCount)
    },
    actions: {
        // Recursively fetches all characters from SWAPI, handling pagination.
        // This method fetches data page by page to avoid overwhelming the server with too many requests at once.
        // Using Promise.all to fetch all pages simultaneously could lead to performance issues or hitting API rate limits with a large number of pages.
        async fetchPeople(nextPage: string = BASE_URL) {
            this.loading = true;
            try {
                const response = await axios.get(nextPage);
                this.totalCount = response.data.count;
                this.loadedCount += response.data.results.length;
                const filteredPeople = filterPeople(response.data.results).map(mapPerson);

                // Accumulate filtered characters
                this.people = [...this.people, ...filteredPeople];

                // If there's a next page, recursively call fetchPeople with the next page URL
                if (response.data.next) {
                    await this.fetchPeople(response.data.next);
                }
            } catch (error) {
                console.error('Error fetching people:', error);
            } finally {
                this.loading = false;
            }
        },
        async getPersonById(id: string | RouteParamValue[]) {
            let person = this.people.find(p => p.id === id);
            if (!person) {
                const response = await axios.get(`${BASE_URL}${id}/`);
                person = response.data;
            }
            return person;
        }
    },
});
