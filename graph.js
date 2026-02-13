function friendSuggestions(edges, u) {
    // Step 1: Build adjacency list
    const adj = {};
    for (const [x, y] of edges) {
        if (!adj[x]) adj[x] = [];
        if (!adj[y]) adj[y] = [];
        adj[x].push(y);
        adj[y].push(x);
    }

    // Step 2: Get friends of u
    const friends = adj[u] || [];

    // Step 3: Find friends-of-friends and count mutual friends
    const mutualCounts = {};
    for (const friend of friends) {
        for (const foaf of adj[friend] || []) {
            if (foaf !== u && !friends.includes(foaf)) {
                mutualCounts[foaf] = (mutualCounts[foaf] || 0) + 1;
            }
        }
    }

    // Step 4: Rank by mutual count and get top 3
    const sorted = Object.entries(mutualCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    // Output
    console.log("Mutual counts:", mutualCounts);
    console.log("Top 3 suggestions:", sorted);
}

// Example usage
const edges = [
    ["A","B"], ["A","C"], ["B","D"], ["C","D"], ["C","E"], ["D","F"]
];
const u = "A";
friendSuggestions(edges, u);
