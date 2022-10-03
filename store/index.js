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
                .get("https://alex-bookstore.com/book/", {
                    params: { ...params}
                })
                .then((res) => {
                    commit("items", res.data);
                });
        } else {
            await this.$axios.get("https://alex-bookstore.com/book/").then((res) => {
                commit("items", res.data);
            });
        }
    },

    async find({ commit }, ID) {
        await this.$axios
            .get("https://alex-bookstore.com/book/" + ID)
            .then((res) => {
                commit("book", res.data);
            });
    },

    async store({ commit }, params) {
        if (params.book.ID) {
            return this.$axios.put(
                "https://alex-bookstore.com/book/" + params.book.ID,
                params.form
            );
        }
        return this.$axios.post("https://alex-bookstore.com/book/", params.form);
    },

    async delete({ commit }, ID) {
        return this.$axios.delete("https://alex-bookstore.com/book/" + ID);
    }
};

export const getters = {
    items: (state) => state.items,
    book: (state) => state.book
};
