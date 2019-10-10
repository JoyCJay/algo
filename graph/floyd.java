import java.util.Arrays;

/**
 * floyd，多源路径，动态规划原理
 * https://blog.csdn.net/liuyanling_cs/article/details/56330652 两个算法延申到动态规划和贪心
 */
public class floyd {

    final static int INF = Integer.MAX_VALUE;
    public static void main(String[] args) {
        int [][] matrix = {
            {0, 5, 2, INF, INF, INF, INF},
            {5, 0, INF, 1, 6, INF, INF},
            {2, INF, 0, 6, INF, 8, INF},
            {INF, 1, 6, 0, 1, 2, INF},
            {INF, 6, INF, 1, 0, INF, 7},
            {INF, INF, 8, 2, INF, 0, 3},
            {INF, INF, INF, INF, 7, 3, 0}
        };

        floyd_algo(matrix);
    }

    private static void floyd_algo(int[][] matrix) {
        for (int k=0; k<matrix.length; k++){ //主对角线遍历
            for (int i=0; i<matrix.length; i++){
                for ( int j=0; j<matrix.length; j++){
                    if (matrix[i][k] == INF || matrix[k][j] == INF) {
                        continue;
                    }
                    matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
                }
            }
        }

        for (int i = 0; i < matrix.length; i++) {
            System.out.println(Arrays.toString(matrix[i]));
        }
    }

    
}