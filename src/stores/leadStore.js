import { defineStore } from "pinia";
import axios from "axios";
import config from "@/config";
const API_URL = config.apiPHPBaseUrl;

export const useLeadStore = defineStore("lead", {
  state: () => ({
    leads: [],
    selectedLead: null,
    isLoading: false,
    error: null,
  }),
  getters: {
    leadCount: (state) => state.leads.length,
    filteredLeads: (state) => (filter = {}) => {
      return state.leads.filter((lead) => {
        return Object.entries(filter).every(([key, value]) => lead[key] === value);
      });
    }
  },
  actions: {
    getAuthHeaders() {
      const token = localStorage.getItem("authToken");
      return token ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        'Accept': 'application/json'
      } : {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      };
    },
    async fetchLeads( filter = {}) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_URL}/leads`, {
          params: filter,
          headers: this.getAuthHeaders()
        });

        let leadsData = response.data;

        if (leadsData && leadsData.data && Array.isArray(leadsData.data)) {
          this.leads = leadsData.data;
        }

        else if (Array.isArray(leadsData)) {
          this.leads = leadsData;
        }

        else if (leadsData && leadsData.leads && Array.isArray(leadsData.leads)) {
          this.leads = leadsData.leads;
        }

        else {
          console.warn('Unexpected response format:', leadsData);
          this.leads = [];
        }

      } catch (error) {
        this.leads = [];
        this.error = error.response?.data?.message || 'Failed to fetch leads';
        console.error('Error fetching leads:', error);
      } finally {
        this.isLoading = false;
      }

    },
    async createLead(leadData) {
       this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post(`${API_URL}/leads`, leadData, {
          headers: this.getAuthHeaders()
        });
        console.log('Create lead response:', response);
        if (!Array.isArray(this.leads)) {
          this.leads = [];
        }

        const leadResponse = response.data.data || response.data;

        if (leadResponse && typeof leadResponse === 'object' && (leadResponse.id || leadResponse.name)) {
          this.leads.unshift(leadResponse);
          return leadResponse;
        } else {
          await this.fetchLeads();
          return true;
        }
      } catch (error) {
        let errorMessage = 'Failed to create lead';

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.errors) {
          const validationErrors = Object.values(error.response.data.errors).flat();
          errorMessage = validationErrors.join(', ');
        } else if (error.message) {
          errorMessage = error.message;
        }

        this.error = errorMessage;
        console.error('Error creating lead:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async updateLead(id, leadData) {
       this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.put(`${API_URL}/leads/${id}`, leadData, {
          headers: this.getAuthHeaders()
        });

        const leadResponse = response.data.data || response.data;

        if (Array.isArray(this.leads)) {
          const index = this.leads.findIndex(lead => lead.id === id);
          if (index !== -1) {
            this.leads[index] = leadResponse;
          }
        }

        if (this.selectedLead && this.selectedLead.id === id) {
          this.selectedLead = leadResponse;
        }
        return leadResponse;
      } catch (error) {
        let errorMessage = 'Failed to update lead';

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.errors) {
          const validationErrors = Object.values(error.response.data.errors).flat();
          errorMessage = validationErrors.join(', ');
        } else if (error.message) {
          errorMessage = error.message;
        }

        this.error = errorMessage;
        console.error('Error updating lead:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteLead(id) {
        this.isLoading = true;
      this.error = null;
      try {
        await axios.delete(`${API_URL}/leads/${id}`, {
          headers: this.getAuthHeaders()
        });

        if (Array.isArray(this.leads)) {
          this.leads = this.leads.filter(lead => lead.id !== id);
        }

        if (this.selectedLead && this.selectedLead.id === id) {
          this.selectedLead = null;
        }
        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete lead';
        console.error('Error deleting lead:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    clearSelectedLead() {
      this.selectedLead = null;
    },

    clearError() {
      this.error = null;
    }
  },
});
