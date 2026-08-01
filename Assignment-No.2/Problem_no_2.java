import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class Problem_no_2 {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();
        int d = sc.nextInt();

        ArrayList<Integer>[] adj = new ArrayList[n + 1];

        for (int i = 1; i <= n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int i = 0; i < m; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();

            adj[u].add(v);
            adj[v].add(u);
        }

        int[] dist = new int[n + 1];
        Arrays.fill(dist, -1);

        Queue<Integer> q = new LinkedList<>();

        q.offer(1);
        dist[1] = 0;

        while (!q.isEmpty()) {

            int node = q.poll();

            for (int next : adj[node]) {

                if (dist[next] == -1) {

                    dist[next] = dist[node] + 1;
                    q.offer(next);
                }
            }
        }

        int cnt = 0;

        for (int i = 1; i <= n; i++) {
            if (dist[i] != -1 && dist[i] <= d) {
                cnt++;
            }
        }

        System.out.println(cnt);
    }
}