import java.util.*;

public class Problem_no_1 {

    static ArrayList<Integer>[] adj;
    static int[] arr;
    static int count = 0;
    static int k;

    static void solve(int node, int parent, int xr) {

        xr = xr ^ arr[node];

        if (xr >= k) {
            count++;
        }

        for (int it : adj[node]) {
            if (it != parent) {
                solve(it, node, xr);
            }
        }
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        k = sc.nextInt();

        arr = new int[n + 1];
        adj = new ArrayList[n + 1];

        for (int i = 1; i <= n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int i = 1; i <= n; i++) {
            arr[i] = sc.nextInt();
        }

        for (int i = 0; i < n - 1; i++) {

            int u = sc.nextInt();
            int v = sc.nextInt();

            adj[u].add(v);
            adj[v].add(u);
        }

        solve(1, -1, 0);

        System.out.println(count);
    }
}