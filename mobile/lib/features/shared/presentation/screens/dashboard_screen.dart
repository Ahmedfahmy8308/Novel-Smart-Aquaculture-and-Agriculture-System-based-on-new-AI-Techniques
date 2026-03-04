import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../widgets/custom_card.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AgriMind Dashboard'),
        actions: [
          IconButton(
            onPressed: () => context.push('/chat'),
            icon: const Icon(Icons.chat),
          ),
          IconButton(
            onPressed: () => context.push('/profile'),
            icon: const Icon(Icons.person),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: GridView.count(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          children: [
            _buildFeatureCard(
              context,
              'Fish Disease Detection',
              Icons.pest_control,
              Colors.red,
              '/aquaculture/disease-detection',
            ),
            _buildFeatureCard(
              context,
              'Growth Monitoring',
              Icons.trending_up,
              Colors.blue,
              '/aquaculture/growth-monitoring',
            ),
            _buildFeatureCard(
              context,
              'Crop Health',
              Icons.eco,
              Colors.green,
              '/agriculture/crop-health',
            ),
            _buildFeatureCard(
              context,
              'Weather Forecast',
              Icons.wb_sunny,
              Colors.orange,
              '/weather/forecast',
            ),
            _buildFeatureCard(
              context,
              'Energy Monitoring',
              Icons.electrical_services,
              Colors.yellow[700]!,
              '/energy/monitoring',
            ),
            _buildFeatureCard(
              context,
              'AI Assistant',
              Icons.smart_toy,
              Colors.purple,
              '/chat',
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: 0,
        onTap: (index) {
          switch (index) {
            case 0:
              // Already on dashboard
              break;
            case 1:
              context.push('/chat');
              break;
            case 2:
              context.push('/settings');
              break;
            case 3:
              context.push('/profile');
              break;
          }
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(icon: Icon(Icons.chat), label: 'AI Chat'),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }

  Widget _buildFeatureCard(
    BuildContext context,
    String title,
    IconData icon,
    Color color,
    String route,
  ) {
    return CustomCard(
      onTap: () => context.push(route),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 48, color: color),
          const SizedBox(height: 8),
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
