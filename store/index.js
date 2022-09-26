export const state = () => ({
    items: [],
    book: {}
});

export const mutations = {
    items: (state, items) => state.items = items,
    book: (state, book) => state.book = book
};

export const actions = {
    async get({ commit }, params) {
        if (params) {
            await this.$axios
                .get("/api/", {
                    params: { ...params}
                })
                .then((res) => {
                    commit("items", res.data);
                });
        } else {
            await this.$axios.get("/api/").then((res) => {
                commit("items", res.data);
            });
        }
    },

    async find({ commit }, ID) {
        await this.$axios
            .get("/api/" + ID)
            .then((res) => {
                commit("book", res.data);
            });
    },

    async store({ commit }, params) {
        if (params.book.ID) {
            return this.$axios.put(
                "/api/" + params.book.ID,
                params.form
            );
        }
        return this.$axios.post("/api/", params.form);
    },

    async delete({ commit }, ID) {
        return this.$axios.delete("/api/" + ID);
    }
};

export const getters = {
    items: (state) => state.items,
    book: (state) => state.book
};
