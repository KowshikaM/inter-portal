import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Medal, Award, TrendingUp } from "lucide-react";

const Leaderboard = () => {
  const navigate = useNavigate();

  const currentUserName = localStorage.getItem('intern_name') || 'Your Name';

  // Mock leaderboard data
  const leaderboardData = [
    { name: currentUserName, amount: 12450, referrals: 8, rank: 3, growth: 23 },
    { name: "Sarah Chen", amount: 18750, referrals: 12, rank: 1, growth: 31 },
    { name: "Mike Rodriguez", amount: 16200, referrals: 15, rank: 2, growth: 28 },
    { name: "Alex Johnson", amount: 12450, referrals: 8, rank: 3, growth: 23 },
    { name: "Emma Wilson", amount: 11800, referrals: 10, rank: 4, growth: 19 },
    { name: "David Kim", amount: 9650, referrals: 7, rank: 5, growth: 15 },
    { name: "Lisa Parker", amount: 8900, referrals: 6, rank: 6, growth: 12 },
    { name: "James Brown", amount: 7500, referrals: 5, rank: 7, growth: 8 },
    { name: "Anna Martinez", amount: 6200, referrals: 4, rank: 8, growth: 5 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-warning" />;
      case 2:
        return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 3:
        return <Award className="w-5 h-5 text-warning/70" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">#{rank}</span>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  const currentUser = "Alex Johnson";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <p className="text-muted-foreground">See how you rank against other interns</p>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaderboardData.slice(0, 3).map((intern, index) => (
            <Card 
              key={intern.name} 
              className={`relative ${
                intern.name === currentUser ? 'ring-2 ring-primary' : ''
              } ${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
            >
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  {getRankIcon(intern.rank)}
                </div>
                <div className="space-y-1">
                  <Avatar className="w-16 h-16 mx-auto">
                    <AvatarFallback className="text-lg font-semibold">
                      {intern.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{intern.name}</CardTitle>
                  {intern.name === currentUser && (
                    <Badge variant="default" className="text-xs">You</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <div className="text-2xl font-bold text-success">
                  ${intern.amount.toLocaleString()}
                </div>
                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                  <span>{intern.referrals} referrals</span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +{intern.growth}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Full Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboardData.map((intern) => (
                <div
                  key={intern.name}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-muted/50 ${
                    intern.name === currentUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(intern.rank)}
                    </div>
                    <Avatar>
                      <AvatarFallback>
                        {intern.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{intern.name}</span>
                        {intern.name === currentUser && (
                          <Badge variant="default" className="text-xs">You</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {intern.referrals} referrals • +{intern.growth}% growth
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">
                      ${intern.amount.toLocaleString()}
                    </div>
                    <Badge variant={getRankBadgeVariant(intern.rank)} className="text-xs">
                      Rank #{intern.rank}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                ${leaderboardData.reduce((sum, intern) => sum + intern.amount, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Raised by All Interns</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-info">
                {leaderboardData.reduce((sum, intern) => sum + intern.referrals, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Referrals Made</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-warning">
                {Math.round(leaderboardData.reduce((sum, intern) => sum + intern.growth, 0) / leaderboardData.length)}%
              </div>
              <p className="text-sm text-muted-foreground">Average Growth Rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;