import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class WaterTracker extends JFrame {
    private int goal = 2000;       // ціль у мл
    private int current = 0;       // випито
    private int step = 200;        // крок додавання
    
    private JProgressBar progressBar;
    private JLabel percentLabel;
    private JLabel amountLabel;
    private JButton addButton;

    public WaterTracker() {
        setTitle("Лічильник води");
        setSize(400, 250);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new GridBagLayout());

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        JLabel goalLabel = new JLabel("Ціль: " + goal + " мл", SwingConstants.CENTER);
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        add(goalLabel, gbc);

        progressBar = new JProgressBar(0, 100);
        progressBar.setValue(0);
        progressBar.setStringPainted(true);
        gbc.gridy = 1;
        add(progressBar, gbc);

        percentLabel = new JLabel("0%", SwingConstants.CENTER);
        gbc.gridy = 2;
        add(percentLabel, gbc);

        amountLabel = new JLabel("0 мл", SwingConstants.CENTER);
        gbc.gridy = 3;
        add(amountLabel, gbc);

        addButton = new JButton("Додати воду (" + step + " мл)");
        gbc.gridy = 4;
        gbc.gridwidth = 1;
        add(addButton, gbc);

        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                addWater();
            }
        });
    }

    private void addWater() {
        current += step;
        if (current > goal) current = goal;

        int percent = (int) Math.round((current / (double) goal) * 100);
        progressBar.setValue(percent);
        percentLabel.setText(percent + "%");
        amountLabel.setText(current + " мл");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            WaterTracker tracker = new WaterTracker();
            tracker.setVisible(true);
        });
    }
}
