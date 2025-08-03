import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Trophy, 
  DollarSign, 
  Users, 
  Target, 
  Copy, 
  Award, 
  TrendingUp,
  LogOut,
  BarChart3
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data - in real app this would come from backend
  const internData = {
    name: localStorage.getItem('intern_name') || 'Alex Johnson',
    // Make referral code dynamic based on username (e.g., lowercase, no spaces, plus 2025)
    referralCode: ((localStorage.getItem('intern_name') || 'Alex Johnson').replace(/\s+/g, '').toLowerCase() + '2025'),
    totalRaised: 12450,
    goal: 15000,
    rank: 3,
    totalInterns: 28,
    referrals: 8,
    lastWeekGrowth: 23
  };

  const rewards = [
    { name: "First Donation", amount: 50, unlocked: true },
    { name: "Team Player", amount: 500, unlocked: true },
    { name: "Rising Star", amount: 1000, unlocked: true },
    { name: "Top Performer", amount: 5000, unlocked: true },
    { name: "Champion", amount: 10000, unlocked: true },
    { name: "Legend", amount: 15000, unlocked: false },
    { name: "Ultimate", amount: 25000, unlocked: false },
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(internData.referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('intern_logged_in');
    localStorage.removeItem('intern_name');
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
    navigate('/');
  };

  const progressPercentage = (internData.totalRaised / internData.goal) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome back, {internData.name}!
            </h1>
            <p className="text-muted-foreground">Track your progress and unlock achievements</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/leaderboard')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Leaderboard
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Raised */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                ₹{internData.totalRaised.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{internData.lastWeekGrowth}% from last week
              </p>
            </CardContent>
          </Card>

          {/* Rank */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
              <Trophy className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">#{internData.rank}</div>
              <p className="text-xs text-muted-foreground">
                out of {internData.totalInterns} interns
              </p>
            </CardContent>
          </Card>

          {/* Referrals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referrals</CardTitle>
              <Users className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">{internData.referrals}</div>
              <p className="text-xs text-muted-foreground">
                people joined through you
              </p>
            </CardContent>
          </Card>

          {/* Goal Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round(progressPercentage)}%
              </div>
              <p className="text-xs text-muted-foreground">
                ₹{(internData.goal - internData.totalRaised).toLocaleString()} to go
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Fundraising Progress
              </CardTitle>
              <CardDescription>
                Your journey towards the ₹{internData.goal.toLocaleString()} goal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">₹{internData.totalRaised.toLocaleString()} / ₹{internData.goal.toLocaleString()}</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">Your Referral Code</p>
                  <p className="text-xs text-muted-foreground">Share this code to earn bonuses</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {internData.referralCode}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={copyReferralCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rewards Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-warning" />
                Rewards & Achievements
              </CardTitle>
              <CardDescription>
                Unlock rewards as you progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rewards.map((reward, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      reward.unlocked 
                        ? 'bg-success/10 border border-success/20' 
                        : 'bg-muted/50 border border-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        reward.unlocked ? 'bg-success' : 'bg-muted-foreground'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          reward.unlocked ? 'text-success' : 'text-muted-foreground'
                        }`}>
                          {reward.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ₹{reward.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {reward.unlocked && (
                      <Badge variant="default" className="bg-success">
                        ✓
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;