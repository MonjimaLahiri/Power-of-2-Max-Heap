import java.util.ArrayList;
import java.util.Collections;

public class PowerOfTwoMaxHeap {
    private ArrayList<Integer> heap;
    private final int degree;
    private final int branchingFactor;

    public PowerOfTwoMaxHeap(int degree) {
        if (degree < 0) {
            throw new IllegalArgumentException("Degree must be non-negative.");
        }
        this.degree = degree;
        this.branchingFactor = (int) Math.pow(2, degree); // 2^degree children per node
        this.heap = new ArrayList<>();
    }

    public void insert(int value) {
        heap.add(value);
        heapifyUp(heap.size() - 1);
    }

    public int popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty.");
        }
        
        int maxValue = heap.get(0);
        int lastValue = heap.remove(heap.size() - 1);

        if (!heap.isEmpty()) {
            heap.set(0, lastValue);
            heapifyDown(0);
        }

        return maxValue;
    }

    private void heapifyUp(int index) {
        while (index > 0) {
            int parentIndex = getParentIndex(index);
            if (heap.get(index) > heap.get(parentIndex)) {
                Collections.swap(heap, index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private void heapifyDown(int index) {
        while (true) {
            int maxIndex = index;
            int firstChildIndex = getChildIndex(index, 0);

            for (int i = 0; i < branchingFactor; i++) {
                int childIndex = firstChildIndex + i;
                if (childIndex < heap.size() && heap.get(childIndex) > heap.get(maxIndex)) {
                    maxIndex = childIndex;
                }
            }

            if (maxIndex != index) {
                Collections.swap(heap, index, maxIndex);
                index = maxIndex;
            } else {
                break;
            }
        }
    }

    private int getParentIndex(int childIndex) {
        return (childIndex - 1) / branchingFactor;
    }

    private int getChildIndex(int parentIndex, int childOffset) {
        return branchingFactor * parentIndex + 1 + childOffset;
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    public void printHeap() {
        System.out.println(heap);
    }

    public static void main(String[] args) {
        PowerOfTwoMaxHeap heap = new PowerOfTwoMaxHeap(2); // Each node has 2^2 = 4 children

        int[] values = {10, 20, 15, 30, 25, 5, 40, 50};
        for (int val : values) {
            heap.insert(val);
            heap.printHeap();
        }

        System.out.println("Popping max values:");
        while (!heap.isEmpty()) {
            System.out.println("Max: " + heap.popMax());
            heap.printHeap();
        }
    }
}
