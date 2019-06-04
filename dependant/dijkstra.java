import java.util.Arrays;

/**
 * dijkstra
 */
public class dijkstra {
    
    static int start=0;
    static int end=5;
    static int size=6;
    
    static int[] best = new int[size];
    static int[] former = new int[size];
    static boolean[] visited = new boolean[size];

    final static int INF = 99999; //不能用Integer.MAX_VALUE，否则越界成负数了；
    public static void main(String[] args) {
        int [][] matrix = {
            {INF, 10 , 20 , INF, INF, INF},
            {INF, INF, INF, 50 , 10 , INF},
            {INF, INF, INF, 20 , 33 , INF},
            {INF, INF, INF, INF, 20 , 2  },
            {INF, INF, INF, INF, INF, 1  },
            {INF, INF, INF, INF, INF, INF}
        };
        dijkstra_algo(matrix);
        display();
    }

    private static void dijkstra_algo(int[][] matrix) {
        //initialize
        for (int i = 0; i < size; i++) {
            best[i]=INF;
            former[i]=-1;
            visited[i]=false;
        }
        best[start]=0;

        int inter=0; //中继点
        int min_best_value=0;
        while (min_best_value < INF) {
            min_best_value=INF;
            //查找是否存在中继点
            for (int i = 0; i < size; i++) {
                if (visited[i]==false && best[i]<min_best_value) {
                    inter = i;
                    min_best_value = best[i];
                }
            }
            //找到中继点
            if (min_best_value<INF) {
                visited[inter] = true;
                for (int j = 0; j < size; j++) {
                    if (matrix[inter][j] + min_best_value < best[j]) {
                        best[j] = matrix[inter][j] + min_best_value;
                        former[j] = inter;
                    }
                }
            }
            System.out.println(Arrays.toString(visited));
        }
    }

    private static void display() {
        System.out.println("best:"+Arrays.toString(best));
        System.out.println("former:"+Arrays.toString(former));
    }
}